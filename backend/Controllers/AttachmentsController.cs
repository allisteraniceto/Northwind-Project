using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("[controller]")]
public class AttachmentsController : ControllerBase
{
    private readonly APIDbContext _dbContext; 

    public AttachmentsController(APIDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    [Route("UploadAttachment")]
    public async Task<IActionResult> UploadAttachment(IFormFile file, string caption)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("Error uploading file.");
        }

        var review = default(Review);
        //find the current review for the selected employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Status != "Finalized");

        //create a File model instance to insert into Files table
        var upload = new Attachment
        {
            ReviewID = review.ReviewID,
            AttachmentName = DateTimeOffset.Now.ToUnixTimeMilliseconds() + "_" + file.FileName, // add the time in milliseconds to ensure a unique file name
            Caption = caption
        };

        _dbContext.Attachments.Add(upload);
        _dbContext.SaveChanges();

        //Create memory stream
        using (var stream = new MemoryStream())
        {
            //copy file to memory stream
            await file.CopyToAsync(stream);

            //reset the memory stream position to 0 so we can read from the beginning below
            stream.Position = 0;

            //create the path for the attachments folder, this is where the attachment will be saved
            var attachmentsFolder = Path.Combine("attachments");
            var filePath = Path.Combine(attachmentsFolder, upload.AttachmentName ); 
            //create a filestream with the path as the attachments folder, then copy to file stream
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await stream.CopyToAsync(fileStream);
            }
        }


        //create a Log model instance to insert into Logs table
        var log = new Log
        {
            Event = "Attachment Uploaded",
            DateAndTime = DateTime.Now,
            ReviewID = review.ReviewID
        };

        _dbContext.Logs.Add(log);
        _dbContext.SaveChanges();


        return Ok("File uploaded successfully.");
    }

    [HttpPost]
    [Route("DownloadAttachment")]
    public async Task<IActionResult> DownloadAttachment(int fileID, int year)
    {
        var review = default(Review);
        //find the current review for the selected employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Year == year);

        // find the attachment with the given name and year
        var attachment = _dbContext.Attachments.FirstOrDefault(attachment => attachment.ReviewID == review.ReviewID && review.Year == year && attachment.FileID == fileID);

        if(attachment == null) // if no matching file by that name
        {
            return NotFound("No file of that name was found for this review.");
        }

        var attachmentsFolder = Path.Combine("attachments");
        var filePath = Path.Combine(attachmentsFolder, attachment.AttachmentName);

        //read the file into memory
        byte[] fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);

        //set HTTP headers
        string contentType = "application/octet-stream";
        Response.Headers.Add("Content-Disposition", "attachment; filename=" + attachment.AttachmentName);

        //return file
        return File(fileBytes, contentType);

    }

    [HttpPost]
    [Route("GetAllAttachments")]
    public async Task<IActionResult> GetAllAttachments(int year)
    {
        var review = default(Review);
        //find the current review for the selected employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Year == year);

        //query for all attachments for the given year and convert it to a list of file names 
        var attachments = _dbContext.Attachments
        .Where(attachment => attachment.ReviewID == review.ReviewID && review.Year == year);


        // if no attachments found for the given year
        if(attachments == null)
        {
            return NotFound("No attachments for this year.");
        }


        var attachments_dictionary = new Dictionary<int, string>();

        // Iterate through the records and add key-value pairs to the dictionary
        foreach (var attachment in attachments)
        {
            attachments_dictionary[attachment.FileID] = attachment.Caption;
        }

         //return all the attachments for this year in dictionary form. the key is the FileID and the value is the caption
        return Ok(attachments_dictionary);
    }

    [HttpPost]
    [Route("DeleteAttachment")]
    public async Task<IActionResult> DeleteAttachment(int year, int fileID)
    {
        var review = default(Review);
        //find the current review for the selected employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Year == year);

        // find the attachment with the given name and year
        var attachment = _dbContext.Attachments.FirstOrDefault(attachment => attachment.ReviewID == review.ReviewID && review.Year == year && attachment.FileID == fileID);

        if(attachment == null) // if no matching file by that name
        {
            return NotFound("No file of that name was found for this review.");
        }

        var attachmentsFolder = Path.Combine("attachments");
        var filePath = Path.Combine(attachmentsFolder, attachment.AttachmentName);

        System.IO.File.Delete(filePath);

        _dbContext.Attachments.Remove(attachment);
        await _dbContext.SaveChangesAsync();
        
        
        return Ok();

    }


}
