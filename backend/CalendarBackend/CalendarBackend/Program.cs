// See https://aka.ms/new-console-template for more information

using CalendarBackend.Data;
using CalendarBackend.Model;
using CalendarBackend.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=Database.db"));

builder.Services.AddScoped<EventRepository>();
builder.Services.AddScoped<EventAttendanceRepository>();

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.Run();
