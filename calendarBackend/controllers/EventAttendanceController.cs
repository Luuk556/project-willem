using System.Security.Claims;
using CalendarBackend.Data;
using CalendarBackend.Model;
using CalendarBackend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MyBackend.controllers;

[ApiController]
[Route("event-attendance")]
[Authorize]
public class EventAttendanceController : ControllerBase
{
    private EventAttendanceService _eventAttendanceService;
    
    public EventAttendanceController(AppDbContext context)
    {
        _eventAttendanceService = new EventAttendanceService(context);
    }

        [HttpGet("get")]
        public EventAttendees GetAttendees([FromQuery] int eventId)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
                return null;
            return _eventAttendanceService.GetAttendance(userId, eventId);
        }

    [HttpPost("add")]
    public async Task<IActionResult> AddAttendees([FromQuery] int eventId)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        await _eventAttendanceService.CreateAttendance(userId, eventId);
        return Ok();
    }

    [HttpPost("remove")]
    public async Task<IActionResult> RemoveAttendees([FromQuery] int eventId)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        await _eventAttendanceService.DeleteAttendance(userId, eventId);
        return Ok();
    }
}