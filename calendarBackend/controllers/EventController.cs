using System.Security.Claims;
using CalendarBackend.Data;
using CalendarBackend.Model;
using CalendarBackend.Service;
using Microsoft.AspNetCore.Authorization;
using MyBackend.Dtos;
using CalendarBackend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CalendarBackend.Controllers;

[ApiController]
[Route("event")]
public class EventController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly EventService _eventService;
    private readonly EventAttendanceService _eventAttendanceService;
    public EventController(AppDbContext context)
    {
        _context = context;
        _eventService = new EventService(context);
        _eventAttendanceService = new EventAttendanceService(context);
    }

    [HttpGet("all")]
    public IActionResult GetAllEvents()
    {
        var events = _eventService.GetAll();
        return Ok(events);
    }

    [Authorize]
    [HttpGet("event-previews")]
    public IActionResult GetPreviews([FromQuery] DateTime date)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();

        EventPreviewDto[] result = _eventService.GetPreviewByDateAndUser(date, userId);
        return Ok(result);
    }

    [HttpGet("my-events")]
    public IActionResult GetMyEvents()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        var result = _eventService.GetMyEvents(userId);
        if (result.IsNullOrEmpty())
        {
            return NotFound();
        }
        return Ok(result);
    }

    [HttpGet("details")]
    public IActionResult GetDetails([FromQuery] int eventId)
    {
        EventDetailsDto result = _eventService.GetEventById(eventId);
        return Ok(result);
    }

    [HttpGet("open")]
    public IActionResult GetOpenEventsByDate([FromQuery] DateTime date)
    {
        EventPreviewDto[] result = _eventService.GetPreviewOpenByDate(date);
        return Ok(result);
    }

    [Authorize]
    [HttpPost("create")]
    public async Task<IActionResult> CreateEvent([FromBody] CreateEventDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            return BadRequest("Title is required");

        if (dto.RoomId <= 0)
            return BadRequest("RoomId is invalid");

        if (!DateTime.TryParse($"{dto.StartDate} {dto.StartTime}", out var start) ||
            !DateTime.TryParse($"{dto.EndDate} {dto.EndTime}", out var end))
            return BadRequest("Invalid date/time format");

        if (end <= start)
            return BadRequest("End datetime must be after start datetime");

        if (start < DateTime.UtcNow)
            return BadRequest("Event cannot start in the past");

        if ((end - start).TotalHours > 24)
            return BadRequest("Event duration cannot exceed 24 hours");

        var organizerIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (organizerIdClaim == null || !int.TryParse(organizerIdClaim, out int organizerId))
            return Unauthorized();

        bool overlap = await _context.Events
            .AnyAsync(e => e.RoomId == dto.RoomId &&
                           ((start >= e.StartDate && start < e.EndDate) ||
                            (end > e.StartDate && end <= e.EndDate) ||
                            (start <= e.StartDate && end >= e.EndDate)));
        if (overlap)
            return Conflict("There is already an event in this room that overlaps with the requested time");

        var newEvent = new Event
        {
            Title = dto.Title.Trim(),
            Description = dto.Description?.Trim(),
            RoomId = dto.RoomId,
            StartDate = start,
            EndDate = end,
            OrganizerId = organizerId,
            IsOpen = true
        };

        await _context.Events.AddAsync(newEvent);
        await _context.SaveChangesAsync();
        await _eventAttendanceService.CreateAttendance(organizerId, newEvent.Id, true);

        return Ok(new { message = "Event created", eventId = newEvent.Id });
    }


    [HttpPut("edit/{id}")]
    public async Task<IActionResult> PutEvent(int id, [FromBody] UpdateEventDto event_u)
    {
        var affected = await _context.Events
            .Where(e => e.Id == id)
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(e => e.Title, event_u.Title)
                .SetProperty(e => e.Description, event_u.Description)
                .SetProperty(e => e.RoomId, event_u.RoomId)
                .SetProperty(e => e.StartDate, event_u.StartDate)
                .SetProperty(e => e.EndDate, event_u.EndDate)
                .SetProperty(e => e.IsOpen, event_u.IsOpen)
            );

        if (affected == 0)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpGet("my-invitations")]
    [Authorize]
    public async Task<IActionResult> GetMyInvitations()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        return Ok(_eventService.GetUserInvitations(userId));
    }


    [HttpGet("my-accepted-invitations")]
    [Authorize]
    public async Task<IActionResult> GetMyAcceptedInvitations()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        return Ok(_eventService.GetUserAcceptedInvitations(userId));
    }

    [HttpPost("delete/{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        int result = await _eventService.DeleteById(id, userId);
        if (result == 2)
        {
            return NotFound();
        }
        if (result == 1)
        {
            return Unauthorized();
        }
        return Ok();
    }
}