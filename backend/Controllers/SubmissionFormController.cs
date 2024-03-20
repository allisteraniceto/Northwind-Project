using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
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
    [Route("SetSelectedEmployeeHID")]
    public IActionResult SetSelectedEmployeeHID([FromBody] int employee_HID)
    {
        if(employee_HID == -1)
        {
            Globals.SelectedEmployeeHID = Globals.UserIdentity.HID;
        }
        else
        {
            Globals.SelectedEmployeeHID = employee_HID; //The EmployeeHID for this SubmissionForm will be used to find the current review associated with that Employee
        }

        return Ok();
    }

    [HttpGet]
    [Route("GetEmployeeHID")]
    public IActionResult GetEmployeeHID()
    {
       return Ok(Globals.UserIdentity.HID);

    }

    [HttpPost]
    [Route("SaveResponse")] 
    public IActionResult SaveResponse([FromBody] Response response)
    {
         //This action saves an individual response to the database. This does not finalize the form for the user
        var review = default(Review);

        //find the current review for the employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Status != "Finalized");

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

        var review = default(Review);
        //find the current review for the employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Status != "Finalized");

         
        if(formType == "Employee Comments")
        {
            var reviewResponse = _dbContext.Responses.FirstOrDefault(response => response.ReviewID == review.ReviewID && response.QuestionID == questionNum && response.HID == Globals.SelectedEmployeeHID);
            var queryResult = JsonSerializer.Serialize(reviewResponse);
            return Ok(queryResult);
        }
        else
        {
            var reviewResponse = _dbContext.Responses.FirstOrDefault(response => response.ReviewID == review.ReviewID && response.QuestionID == questionNum && response.HID == review.ManagerHID);
            var queryResult = JsonSerializer.Serialize(reviewResponse);
            return Ok(queryResult);
        }
    }

    [HttpPost]
    [Route("HandleSubmission")]
    public IActionResult HandleSubmission([FromBody] string formType)
    {
         //This action will discern whether a manager or employee hit their "submit" button. It will then change the status of the 
        //review in the database

        var review = default(Review);
        //find the current review for the employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Status != "Finalized");
        if(formType == "employee")
        {
            review.Status = "Employee Comments Submitted";
            _dbContext.SaveChanges();
        }
        else
        {
            review.Status = "Manager Feedback Submitted";
            _dbContext.SaveChanges();
        }
        return Ok();

    }

    [HttpPost]
    [Route("HandleSignature")]
    public IActionResult HandleSignature([FromBody] string formType)
    {
         //This action will discern whether a manager or employee hit their "sign" button. It will then change the status of the 
        //review in the database and update the respective signature field to 1, indicating a signature. Review will be "finalized" when manager clicks the sign button

        var review = default(Review);
        //find the current review for the employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Status != "Finalized");

        if(formType == "employee")
        {
            review.Status = "Signed By Employee";
            review.EmployeeSignature = 1;
            _dbContext.SaveChanges();
        }
        else
        {
            review.Status = "Finalized";
            review.ManagerSignature = 1;
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
        
        var review = default(Review);
        //find the current review for the employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Status != "Finalized");

        return Ok(review.Status);

    }
}