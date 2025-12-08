using CalendarBackend.Service;
using Microsoft.AspNetCore.Mvc;
using MyBackend.Dtos;

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
    public async Task<IActionResult> Login(LoginUserDto dto)
    {
        var user = await _userService.GetByEmailAsync(dto.Email);
        if (user == null || !_userService.VerifyPassword(user.Password, dto.Password))
            return Unauthorized("Invalid credentials");

        var token = _userService.GenerateJwtToken(user);
        return Ok(new { token });
    }
}
