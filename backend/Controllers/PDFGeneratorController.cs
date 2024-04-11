using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("[controller]")]
public class PDFGeneratorController : ControllerBase
{
    private readonly APIDbContext _dbContext; 

    public PDFGeneratorController(APIDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet]
    [Route("GeneratePDF")]
    public IActionResult GeneratePDF()
    {
        var generator = new PDFGenerator(_dbContext);
        var html = generator.GenerateHTML();


        System.IO.File.WriteAllText("performance_review.html", html);

        // Convert HTML to PDF using wkhtmltopdf
        //ConvertHtmlToPdf("performance_review.html", "performance_review.pdf");
        return Ok();
    }






}