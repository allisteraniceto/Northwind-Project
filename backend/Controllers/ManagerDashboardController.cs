using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[ApiController]
[Route("[controller]")]
public class ManagerDashboardController : ControllerBase
{
    // [HttpGet]
    //  public IActionResult SubmissionFormRedirect()
    // {
        
    // }

    // [HttpGet]
    // public IActionResult SendReminder()
    // {
        
    // }

    // [HttpGet]
    // public IActionResult InitiateAllPerformanceReviews()
    // {
        
    // }

    // [HttpGet]
    // public IActionResult ScheduleAppointment()
    // {
        
    // }

    // [HttpGet]
    // public IActionResult PreviousReviewsScrollBar()
    // {
    //     //
    // }

    [HttpGet]
    public IActionResult GetEmployeeList()
    {
        string jsonPath = "employees.json";
        string jsonString = System.IO.File.ReadAllText(jsonPath);

        //Deserialize "employees" field of json string to an employee list
        var employeesList = JsonSerializer.Deserialize<EmployeeList>(jsonString);
        //Create list of employees that we can LINQ query
        var employees = employeesList.Employees;

        // Query for employees with managerId equal to 4
        var employeesWithManager4 = employees.Where(employee => employee.ManagerID == 4).ToList();

        // Serialize the query result to a JSON string
        var queryResult = JsonSerializer.Serialize(employeesWithManager4);

        return Ok(queryResult);
    }
}