using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class IndexController : ControllerBase
{
    private int roleID = 1; // Assume you get the role ID from somewhere

    [HttpGet]
    public IActionResult Index()
     {

        switch (roleID)
        {
            case 1:
                return RedirectToAction("Dashboard", "HRDashboard");

            case 2:
                return RedirectToAction("Dashboard", "ManagerDashboard");

            case 3:
                return RedirectToAction("Dashboard", "EmployeeDashboard");

            default:
                // Handle other cases or redirect to a default page
                return RedirectToAction("DefaultDashboard", "Dashboard");
        }
    }

}