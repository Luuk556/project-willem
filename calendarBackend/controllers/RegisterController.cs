using CalendarBackend.Model;
using CalendarBackend.Service;
using Microsoft.AspNetCore.Mvc;
using MyBackend.Dtos;

namespace CalendarBackend.Controllers;

[ApiController]
[Route("api/register")]
public class RegisterController : ControllerBase
{
    private readonly UserService _userService;

    public RegisterController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> Register(RegisterUserDto dto)
    {
        if (await _userService.EmailExistsAsync(dto.Email))
            return Conflict("Email already exists");

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            Password = _userService.HashPassword(dto.Password),
            Biography = "",
            Role = Role.User
        };

        await _userService.CreateUserAsync(user);
        return StatusCode(201, "User registered successfully");
    }
}
