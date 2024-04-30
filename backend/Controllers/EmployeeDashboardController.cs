using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[ApiController]
[Route("[controller]")]
public class EmployeeDashboardController : ControllerBase
{
    private readonly APIDbContext _dbContext; 
    
    /* WILL MAKE LATER SINCE NO ATTACHMENT AND ATTACHMENT LIST IN DATABASE YET */
    
    // //GET request to get ALL Attachments
    // [HttpGet]
    // [Route("AttachmentListAll")]
    // public IActionResult GetAttachmentListAll()
    // {
    //     string jsonPath = "dummy-attachments.json";
    //     string jsonString = System.IO.File.ReadAllText(jsonPath);

    //     //Deserialize "employees" field of json string to an attachment list
    //     var attachmentsList = JsonSerializer.Deserialize<AttachmentList>(jsonString);
        
    //     //Create list of employees that we can LINQ query
    //     var employees = attachmentsList.attachments;

    //     // Serialize the query result to a JSON string
    //     var queryResult = JsonSerializer.Serialize(employees);

    //     return Ok(queryResult);
    // }
    [HttpGet]
    [Route("GetEmployeeRating")]
    public IActionResult GetEmployeeRating(int employee_HID, int year)
    {
        var review = default(Review);
        //find current review for employee and rating ID
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == employee_HID && review.Year == year);
        
        if (review == null){return NotFound("No review was found for the employee");}

        var rating = default(Rating);
        rating = _dbContext.Ratings.FirstOrDefault(rating => rating.ReviewID == review.ReviewID);

        //handle empty review
        if (rating != null){
            return Ok(rating.Value);
        } else{
            return NotFound("No rating was found for the employee");
        }
    }

    [HttpGet]
    [Route("EmulateEmployee")]
    public IActionResult EmulateEmployee()
    {
        var jsonString = "{\"FirstName\":\"Terry\",\"LastName\":\"Goggey\",\"Email\":\"tgoggey5@google.com.hk\",\"HID\": 6, \"ManagerHID\": 1, \"Role\":\"Employee\"}";

        Globals.IdentityJsonString = jsonString;
        Globals.UserIdentity = JsonSerializer.Deserialize<Identity>(jsonString);
        Globals.SelectedEmployeeHID = Globals.UserIdentity.HID;

        return Ok();
    }

    [HttpGet]
    [Route("EmulateGetEmployee")]
    public IActionResult EmulateGetEmployee(){
        var employee = JsonSerializer.Serialize<Identity>(Globals.UserIdentity); //serialize before sending
        return Ok(employee);
    }
}