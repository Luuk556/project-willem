using System.Security.Claims;
using CalendarBackend.Data;
using CalendarBackend.Model;
using CalendarBackend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyBackend.Dtos;

namespace MyBackend.controllers;

[ApiController]
[Route("event-attendance")]
public class EventAttendanceController : ControllerBase
{
    private EventAttendanceService _eventAttendanceService;
    
    public EventAttendanceController(AppDbContext context)
    {
        _eventAttendanceService = new EventAttendanceService(context);
    }

        [HttpGet("get")]
        [Authorize]
        public EventAttendees GetAttendees([FromQuery] int eventId)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
                return null;
            return _eventAttendanceService.GetAttendance(userId, eventId);
        }

    [HttpPost("add")]
    [Authorize]
    public async Task<IActionResult> AddAttendees([FromQuery] int eventId)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        await _eventAttendanceService.CreateAttendance(userId, eventId, true);
        return Ok();
    }
    
    [HttpPost("invite")]
    public async Task<IActionResult> AddInvite([FromBody] EventAttendanceDto eventAttendee)
    {
        
        await _eventAttendanceService.CreateAttendance(eventAttendee.UserId, eventAttendee.EventId, false);
        return Ok();
    }

    [HttpPost("leave")]
    [Authorize]
    public async Task<IActionResult> LeaveEvent([FromQuery] int eventId)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        await _eventAttendanceService.DeleteAttendance(userId, eventId);
        return Ok();
    }
    
    [HttpPost("remove")]
    public async Task<IActionResult> RemoveAttendees([FromBody] RemoveAttendeeDto eventAttendee)
    {
        await _eventAttendanceService.DeleteAttendance(eventAttendee.UserId, eventAttendee.EventId);
        return Ok();
    }
}