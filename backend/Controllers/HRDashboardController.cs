using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[ApiController]
[Route("[controller]")]
public class HRDashboardController : ControllerBase
{
    [HttpGet]
    public IActionResult Dashboard()
    {
        return Content("Welcome to HR Dashboard!");
    }


    //  [HttpGet]
    // public IActionResult ManagerList()
    // {
    //     //
    // }

    [HttpGet]
    [Route("ManagerList")]
    public IActionResult GetManagerList(int employee_HID = -1) //optional paramter
    {
        string jsonPath = "employees.json";
        string jsonString = System.IO.File.ReadAllText(jsonPath);

        //Deserialize "employees" field of json string to an employee list
        var employeesList = JsonSerializer.Deserialize<EmployeeList>(jsonString);
        //Create list of employees that we can LINQ query
        var employees = employeesList.Employees;

        // Query for employees with managerId equal to 4
        var employeesWithManager0 = employees.Where(employee => employee.ManagerID == 0).ToList();

        // Serialize the query result to a JSON string
        var queryResult = JsonSerializer.Serialize(employeesWithManager0);
        return Ok(queryResult);
    }

    // [HttpGet]
    // public IActionResult EmployeeList()
    // {
    //     //
    // }

    //  [HttpGet]
    //  public IActionResult PreviousReviewsScrollBar()
    // {
    //     //
    // }
    // Add other HR-specific actions
        //GET request to retrieve all managers TEST

}