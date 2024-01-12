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

    // Add other HR-specific actions
}