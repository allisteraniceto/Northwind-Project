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

        //Create memory stream
        using (var stream = new MemoryStream())
        {
            //copy file to memory stream
            await file.CopyToAsync(stream);

            //reset the memory stream position to 0 so we can read from the beginning below
            stream.Position = 0;

            //create the path for the attachments folder, this is where the attachment will be saved
            var attachmentsFolder = Path.Combine("attachments");
            var filePath = Path.Combine(attachmentsFolder, file.FileName);

            //create a filestream with the path as the attachments folder, then copy to file stream
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await stream.CopyToAsync(fileStream);
            }
        }


        var review = default(Review);
        //find the current review for the selected employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Status != "Finalized");

        //create a File model instance to insert into Files table
        var upload = new Attachment
        {
            ReviewID = review.ReviewID,
            AttachmentName = file.FileName,
            Caption = caption
        };

        _dbContext.Attachments.Add(upload);
        _dbContext.SaveChanges();

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
    public async Task<IActionResult> DownloadAttachment(string attachmentName, int year)
    {
        var review = default(Review);
        //find the current review for the selected employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Year == year);

        // find the attachment with the given name and year
        var attachment = _dbContext.Attachments.FirstOrDefault(attachment => attachment.ReviewID == review.ReviewID && review.Year == year && attachment.AttachmentName == attachmentName);

        if(attachment == null) // if no matching file by that name
        {
            return NotFound("No file of that name was found for this review.");
        }

        var attachmentsFolder = Path.Combine("attachments");
        var filePath = Path.Combine(attachmentsFolder, attachmentName);

        //read the file into memory
        byte[] fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);

        //set HTTP headers
        string contentType = "application/octet-stream";
        Response.Headers.Add("Content-Disposition", "attachment; filename=" + attachmentName);

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
        var file_names = _dbContext.Attachments
        .Where(attachment => attachment.ReviewID == review.ReviewID && review.Year == year)
        .Select(attachment => attachment.AttachmentName)
        .ToList();

        // if no attachments found for the given year
        if(file_names == null)
        {
            return NotFound("No attachments for this year.");
        }

        //return all the attachment file names in list form
        return Ok(file_names);

    }

    [HttpPost]
    [Route("DeleteAttachment")]
    public async Task<IActionResult> DeleteAttachment(int year, string attachmentName)
    {
        var review = default(Review);
        //find the current review for the selected employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Year == year);

        // find the attachment with the given name and year
        var attachment = _dbContext.Attachments.FirstOrDefault(attachment => attachment.ReviewID == review.ReviewID && review.Year == year && attachment.AttachmentName == attachmentName);

        if(attachment == null) // if no matching file by that name
        {
            return NotFound("No file of that name was found for this review.");
        }

        var attachmentsFolder = Path.Combine("attachments");
        var filePath = Path.Combine(attachmentsFolder, attachmentName);

        System.IO.File.Delete(filePath);

        _dbContext.Attachments.Remove(attachment);
        await _dbContext.SaveChangesAsync();
        
        
        return Ok();

    }


}