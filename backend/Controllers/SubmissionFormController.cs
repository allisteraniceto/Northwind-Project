using Microsoft.AspNetCore.Mvc;
using System.Text.Json;


[ApiController]
[Route("[controller]")]
public class SubmissionFormController : ControllerBase
{
    private readonly APIDbContext _dbContext; // Replace YourDbContext with your actual DbContext

    public SubmissionFormController(APIDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public IActionResult SaveResponse()
    {
        //This action saves an individual response to the database. This does not finalize the form for the user
    
        // _dbContext.Responses.Add(textResponse);
        // _dbContext.SaveChanges();

        return Ok("Response saved successfully");
    }

    // [HttpPost]
    // public IActionResult SubmitPerformanceReview()
    // {
    //     //This action inserts the entire form into the database and does not allow changes to responses once finished


    // }

}