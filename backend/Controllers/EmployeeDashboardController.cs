using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[ApiController]
[Route("[controller]")]
public class EmployeeDashboardController : ControllerBase
{
    

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
}