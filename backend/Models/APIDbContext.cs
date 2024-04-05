using Microsoft.EntityFrameworkCore;

public class APIDbContext : DbContext
{
    public APIDbContext(DbContextOptions option) : base(option)
    {

    }

    public DbSet<Question> Questions {get; set;}

    public DbSet<TextResponse> Responses {get; set;}

    public DbSet<Rating> Ratings {get; set;}

    public DbSet<Log> Logs {get; set;}

    public DbSet<Attachment> Attachments {get; set;}

    public DbSet<Review> Reviews {get; set;}
}