using Microsoft.EntityFrameworkCore;

//using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Dependency injection of DbContext Class
builder.Services.AddDbContext<APIDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
IdentityService.ObtainIdentity(); //Obtain the identity of the user

var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetRequiredService<IConfiguration>();
var frontendURL = configuration.GetValue<string>("frontend_url");
//dependency injection for EmailSender
builder.Services.AddTransient<EmailSender>();


// builder.Services.AddCors(options => 
// {
//     options.AddDefaultPolicy(policy => 
//     {
//         policy.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader();
//     });
// });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors(options => {
    options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
});

app.UseAuthorization();

app.MapControllers();

app.Run();


