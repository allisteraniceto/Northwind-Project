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
    [Route("SaveResponse")] 
    public IActionResult SaveResponse([FromBody] Response response)
    {
         //This action saves an individual response to the database. This does not finalize the form for the user

        var review = default(Review);
        //find the current review for the user
        if(response.formType == "Employee Comments")
        {
            review = _dbContext.Reviews.FirstOrDefault(review => review.Status != "finalized" && 
                review.EmployeeHID == Globals.UserIdentity.HID);
        }
        else
        {
            review = _dbContext.Reviews.FirstOrDefault(review => review.Status != "finalized" && 
                review.ManagerHID == Globals.UserIdentity.HID);
        }
        

        //query to see if there is already a response associated with this question for this user
        var existingResponse = _dbContext.Responses.FirstOrDefault(r => 
            r.QuestionID == response.questionNum && 
            r.HID == Globals.UserIdentity.HID && 
            r.ReviewID == review.ReviewID);


        if(existingResponse != null)
        {
            // Update the existing response
            existingResponse.Content = response.inputString;
            _dbContext.SaveChanges();
        }
        else
        {
            // if no existing response, create new TextResponse instance and insert to DB
            var textResponse = new TextResponse
            {
                Content = response.inputString,
                QuestionID = response.questionNum,
                HID = Globals.UserIdentity.HID,
                Name = Globals.UserIdentity.FirstName + Globals.UserIdentity.LastName,
                ReviewID = review.ReviewID
            };

            _dbContext.Responses.Add(textResponse);
            _dbContext.SaveChanges();
        }
        return Ok();
    }

    [HttpPost]
    [Route("GetResponse")]
    public IActionResult GetResponse([FromBody] Response response)
    {
         //This action displays responses (null or not) associated with each question
        var formType = response.formType;
        var questionNum = response.questionNum;
         
        if(formType == "Employee Comments")
        {
            var reviewResponses = _dbContext.Responses.FirstOrDefault(response => response.ReviewID == 3 && response.QuestionID == questionNum && response.HID == Globals.UserIdentity.HID);
            var queryResult = JsonSerializer.Serialize(reviewResponses);
            return Ok(queryResult);
        }
        else
        {
            var reviewResponses = _dbContext.Responses.FirstOrDefault(response => response.ReviewID == 3 && response.QuestionID == questionNum && response.HID == Globals.UserIdentity.ManagerHID);
            var queryResult = JsonSerializer.Serialize(reviewResponses);
            return Ok(queryResult);
        }
    }

    [HttpPost]
    [Route("HandleSubmission")]
    public IActionResult HandleSubmission([FromBody] string formType)
    {
         //This action will discern whether a manager or employee hit their "submit" button. It will then change the status of the 
        //review in the database
        if(formType == "employee")
        {
            var review = _dbContext.Reviews.FirstOrDefault(review => review.ReviewID == 3);
            review.Status = "Employee Comments Submitted";
            _dbContext.SaveChanges();
        }
        else
        {
            var review = _dbContext.Reviews.FirstOrDefault(review => review.ReviewID == 3);
            review.Status = "Manager Feedback Submitted";
            _dbContext.SaveChanges();
        }
        return Ok();

    }

    [HttpGet]
    [Route("GetStatus")]
    public IActionResult GetStatus()
    {
         //This action will discern whether a manager or employee hit their "submit" button. It will then change the status of the 
        //review in the database
        var review = _dbContext.Reviews.FirstOrDefault(review => review.ReviewID == 3);

        return Ok(review.Status);

    }

    // [HttpPost]
    // public IActionResult SubmitPerformanceReview()
    // {
    //     //This action inserts the entire form into the database and does not allow changes to responses once finished


    // }

}