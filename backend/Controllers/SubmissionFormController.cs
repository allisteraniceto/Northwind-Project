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
        var jsonObject = new
        {
            Content = "Hello world",
            QuestionID = 1,
            HID = 25,
            Name = "Mark Kneblik"         
        };

        var textResponse = JsonSerializer.Deserialize<TextResponse>(JsonSerializer.Serialize(jsonObject));
        _dbContext.Responses.Add(textResponse);
        _dbContext.SaveChanges();

        return Ok("Response saved successfully");
    }

    [HttpGet]
    public IActionResult GetResponses()
    {
         //This action displays responses (null or not) associated with each question
        var reviewResponses = _dbContext.Responses.Where(response => response.ReviewID == 2).ToList();

        // Serialize the query result to a JSON string
        var queryResult = JsonSerializer.Serialize(reviewResponses);
        return Ok(queryResult);
    }

    // [HttpPost]
    // public IActionResult SubmitPerformanceReview()
    // {
    //     //This action inserts the entire form into the database and does not allow changes to responses once finished


    // }

}