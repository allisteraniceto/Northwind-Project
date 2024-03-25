using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[ApiController]
[Route("[controller]")]
public class ManagerDashboardController : ControllerBase
{
    //create an instance of the EmailSender class
   private readonly EmailSender _emailSender; 
 
    // Receive an instance of the email sender service via dependency injection
    public ManagerDashboardController(EmailSender emailSender) 
    {
        this._emailSender = emailSender;
    }
 
    [HttpPost]
    [Route("SendReminder")]
    public async Task<IActionResult> SendReminder(string recipient)
    {
        string subject = "Please Submit Your Responses";
        string body = "Hello,\n\nYou have not submitted your performance review responses yet. Please do so shortly.\n\nNorth Wind Solutions Notification System";
        await _emailSender.SendEmailAsync(recipient, subject, body);
        return Ok();
    }

   
    [HttpPost]
    [Route("ScheduleAppointment")]
    public async Task<IActionResult> ScheduleAppointment(string recipient)
    {
        string subject = "Scheduling a Performance Review Appointment";
        string body = "Hello,\n\nAn appointment must be scheduled to discuss your performance review with your manager. Please email or give them a call to schedule.\n\nNorth Wind Solutions Notification System";
        await _emailSender.SendEmailAsync(recipient, subject, body);
        return Ok();
    }



    //GET request to retrieve employees with manager_id: 4 (testing it out)
    [HttpGet]
    [Route("EmployeeList")]
    public IActionResult GetEmployeeList(string parameter1, string parameter2) //filter based on requester's parameters
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

    //GET request to get ALL employees
    [HttpGet]
    [Route("EmployeeListAll")]
    public IActionResult GetEmployeeListAll()
    {
        string jsonPath = "employees.json";
        string jsonString = System.IO.File.ReadAllText(jsonPath);

        //Deserialize "employees" field of json string to an employee list
        var employeesList = JsonSerializer.Deserialize<EmployeeList>(jsonString);
        
        //Create list of employees that we can LINQ query
        var employees = employeesList.Employees;

        // Serialize the query result to a JSON string
        var queryResult = JsonSerializer.Serialize(employees);

        return Ok(queryResult);
    }
}