using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CalendarBackend.Controllers;

[ApiController]
[Route("api/logout")]
public class LogoutController : ControllerBase
{

    [AllowAnonymous]
    [HttpPost]
    public IActionResult Logout()
    {
        return Ok(new
        {
            message = "Logged out successfully"
        });
    }
}
