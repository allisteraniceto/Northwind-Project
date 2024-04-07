using Microsoft.AspNetCore.Mvc;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using QuestPDF.Previewer;
using System.Text.Json;


[ApiController]
[Route("[controller]")]
public class SubmissionFormController : ControllerBase
{
    private readonly APIDbContext _dbContext; 

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
    [Route("SaveRating")] 
    public IActionResult SaveRating([FromBody] RatingInput ratingInput)
    {
         //This action saves an individual response to the database. This does not finalize the form for the user
        var review = default(Review);

        //find the current review for the employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Status != "Finalized");

        //query to see if there is already a response associated with this question for this user
        var existingRating = _dbContext.Ratings.FirstOrDefault(r => 
            r.QuestionID == ratingInput.questionNum && 
            r.HID == Globals.UserIdentity.HID && 
            r.ReviewID == review.ReviewID);


        if(existingRating != null)
        {
            // Update the existing response
            existingRating.Value = ratingInput.inputValue;
            _dbContext.SaveChanges();
        }
        else
        {
            // if no existing response, create new TextResponse instance and insert to DB
            var rating = new Rating
            {
                Value = ratingInput.inputValue,
                QuestionID = ratingInput.questionNum,
                HID = Globals.UserIdentity.HID,
                ReviewID = review.ReviewID
            };

            _dbContext.Ratings.Add(rating);
            _dbContext.SaveChanges();
        }
        return Ok();
    }


    [HttpPost]
    [Route("GetRating")]
    public IActionResult GetRating([FromBody] RatingInput ratingInput)
    {
         //This action displays a rating (null or not) associated with each rating question
        var formType = ratingInput.formType;
        var questionNum = ratingInput.questionNum;

        var review = default(Review);
        //find the current review for the employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Status != "Finalized");

         
        if(formType == "Employee Rating")
        {
            var rating = _dbContext.Ratings.FirstOrDefault(rating => rating.ReviewID == review.ReviewID && rating.QuestionID == questionNum && rating.HID == Globals.SelectedEmployeeHID);
            var queryResult = JsonSerializer.Serialize(rating);
            return Ok(queryResult);
        }
        else
        {
            var rating = _dbContext.Ratings.FirstOrDefault(rating => rating.ReviewID == review.ReviewID && rating.QuestionID == questionNum && rating.HID == review.ManagerHID);
            var queryResult = JsonSerializer.Serialize(rating);
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

            var log = new Log
            {
                Event = "Employee Submitted Comments",
                DateAndTime = DateTime.Now,
                ReviewID = review.ReviewID
            };

            _dbContext.Logs.Add(log);
            _dbContext.SaveChanges();
        }
        else
        {
            review.Status = "Manager Feedback Submitted";
            _dbContext.SaveChanges();

            var log = new Log
            {
                Event = "Manager Submitted Feedback",
                DateAndTime = DateTime.Now,
                ReviewID = review.ReviewID
            };

            _dbContext.Logs.Add(log);
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

        if(formType == "employee") // if it is an employee signature
        {
            review.Status = "Signed By Employee";
            review.EmployeeSignature = 1;
            _dbContext.SaveChanges();

            //create a log and save it to DB
             var log = new Log
            {
                Event = "Employee Signed Review",
                DateAndTime = DateTime.Now,
                ReviewID = review.ReviewID
            };

            _dbContext.Logs.Add(log);
            _dbContext.SaveChanges();
        }
        else // if it is a manager signature
        {
            review.Status = "Finalized";
            review.ManagerSignature = 1;
            _dbContext.SaveChanges();

            //create a log and save it to DB
             var log = new Log
            {
                Event = "Manager Signed Review",
                DateAndTime = DateTime.Now,
                ReviewID = review.ReviewID
            };

            _dbContext.Logs.Add(log);
            _dbContext.SaveChanges();

        }
        return Ok();

    }

    [HttpGet]
    [Route("GetStatus")]
    public IActionResult GetStatus()
    {
        var review = default(Review);
        //find the current review for the employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Status != "Finalized");

        return Ok(review.Status);

    }


    [HttpGet]
    [Route("GeneratePDF")]
    public IActionResult GeneratePDF()
    {
            // now that the review is finalized, we will pull all responses into a PDF and save it to the DB in the Attachments table

            // set the license type for the QuestPDF library that we are using
            QuestPDF.Settings.License = LicenseType.Community;

            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Header().Text("Hello from Mark")
                    .SemiBold();
                });



            });

            document.ShowInPreviewer();
            return Ok();
    }






}