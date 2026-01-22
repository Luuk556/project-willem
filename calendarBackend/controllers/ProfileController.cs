using CalendarBackend.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Threading.Tasks;
using MyBackend.Dtos;
using System.IO;

namespace CalendarBackend.Controllers;

[ApiController]
[Route("api/profile")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly UserService _userService;

    public ProfileController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();

        var user = await _userService.GetByIdAsync(userId);
        if (user == null)
            return NotFound();

        return Ok(new
        {
            name = user.Name,
            email = user.Email,
            role = user.Role,
            profilePictureUrl = "/api/profile/me/picture"
        });
    }

    [HttpGet("me/picture")]
    public async Task<IActionResult> GetProfilePicture()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();

        var user = await _userService.GetByIdAsync(userId);
        if (user == null || user.ProfilePicture == null)
            return NotFound();

        return File(user.ProfilePicture, "image/jpeg");
    }

    [HttpPut("me")]
    public async Task<IActionResult> UpdateProfile([FromForm] UpdateUserDto dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();

        var user = await _userService.GetByIdAsync(userId);
        if (user == null) return NotFound();

        if (!string.IsNullOrEmpty(dto.Name))
            user.Name = dto.Name;

        if (!string.IsNullOrEmpty(dto.Email))
            user.Email = dto.Email;

        if (!string.IsNullOrEmpty(dto.Password))
            user.Password = _userService.HashPassword(dto.Password);

        if (dto.ProfilePicture != null && dto.ProfilePicture.Length > 0)
        {
            using var ms = new MemoryStream();
            await dto.ProfilePicture.CopyToAsync(ms);
            user.ProfilePicture = ms.ToArray();
        }

        await _userService.UpdateUserAsync(user);

        return Ok(new
        {
            name = user.Name,
            email = user.Email,
            profilePictureUrl = "/api/profile/me/picture"
        });
    }
}
