using Microsoft.EntityFrameworkCore;
using calendarBackend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Controllers
builder.Services.AddControllers();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .WithOrigins("http://localhost:3000") // React frontend URL
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

// Add OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Enable CORS
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.MapControllers();
app.Run();