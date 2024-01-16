using Microsoft.AspNetCore.Mvc;


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
}