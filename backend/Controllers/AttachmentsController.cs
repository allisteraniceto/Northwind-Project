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
            var attachmentsFolder = Path.Combine("files");
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
        var upload = new File
        {
            ReviewID = review.ReviewID,
            FileName = file.FileName,
            Caption = caption
        };

        _dbContext.Files.Add(upload);
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
}
