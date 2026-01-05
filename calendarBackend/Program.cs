
// See https://aka.ms/new-console-template for more information
using CalendarBackend.Data;
using CalendarBackend.Model;
using CalendarBackend.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var jwtConfig = builder.Configuration.GetSection("Jwt");
var jwtSecret = jwtConfig["Secret"];
var jwtExpiryHours = int.Parse(jwtConfig["ExpiryHours"] ?? "2");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=Database.db"));

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<AttendanceRepository>();
builder.Services.AddScoped<AttendanceService>();
builder.Services.AddScoped<EventRepository>();
builder.Services.AddScoped<EventAttendanceService>();
builder.Services.AddScoped<EventAttendanceRepository>();
builder.Services.AddScoped<RoomRepository>();
builder.Services.AddScoped<RoomService>();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var key = Encoding.ASCII.GetBytes(jwtSecret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; 
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseCors("ReactPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
