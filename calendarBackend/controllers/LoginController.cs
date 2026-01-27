using CalendarBackend.Service;
using Microsoft.AspNetCore.Mvc;
using MyBackend.Dtos;
using CalendarBackend.Model;

namespace CalendarBackend.Controllers;

[ApiController]
[Route("api/login")]
public class LoginController : ControllerBase
{
    private readonly UserService _userService;

    public LoginController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginUserDto dto)
    {
        var normalizedEmail = dto.Email.Trim().ToLowerInvariant();

        var user = await _userService.GetByEmailAsync(normalizedEmail);
        if (user == null || !_userService.VerifyPassword(user.Password, dto.Password))
            return Unauthorized("Invalid credentials");

        if (dto.IsAdmin && user.Role != Role.Admin)
            return Unauthorized("User is not an admin");

        var token = _userService.GenerateJwtToken(user);
        return Ok(new { token });
    }
}
