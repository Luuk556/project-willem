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
        public IActionResult GetAttendees([FromQuery] int eventId)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized();
            EventAttendanceDto result = _eventAttendanceService.GetAttendance(userId, eventId);
            return Ok(result);
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

    [HttpPut("leave/{eventId}")]
    public async Task<IActionResult> LeaveEvent([FromRoute] int eventId)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        await _eventAttendanceService.UpdateAttendance(eventId, userId, false);
        return Ok();
    }
    
    [HttpPost("remove")]
    public async Task<IActionResult> RemoveAttendees([FromBody] RemoveAttendeeDto eventAttendee)
    {
        await _eventAttendanceService.DeleteAttendance(eventAttendee.UserId, eventAttendee.EventId);
        return Ok();
    }

    [HttpPut("accept/{eventId}")]
    public async Task<IActionResult> AcceptEvent([FromRoute] int eventId)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        await _eventAttendanceService.UpdateAttendance(eventId, userId, true);
        return Ok();
    }
    
    [HttpPost("reject/{eventId}")]
    public async Task<IActionResult> RejectInvite([FromRoute] int eventId)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        await _eventAttendanceService.DeleteAttendance(userId, eventId);
        return Ok();
    }
}