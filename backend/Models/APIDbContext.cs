using Microsoft.EntityFrameworkCore;

public class APIDbContext : DbContext
{
    public APIDbContext(DbContextOptions option) : base(option)
    {

    }

    public DbSet<Question> Questions {get; set;}
    public DbSet<TextResponse> Responses {get; set;}
}