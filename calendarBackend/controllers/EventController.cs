using System.Security.Claims;
using CalendarBackend.Data;
using CalendarBackend.Model;
using CalendarBackend.Service;
using Microsoft.AspNetCore.Authorization;
using MyBackend.Dtos;
using CalendarBackend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CalendarBackend.Controllers;
[ApiController]
[Route("event")]
public class EventController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly EventService _eventService;
    public EventController(AppDbContext context)
    {
        _context = context;
        _eventService = new EventService(context);
    }

    [HttpGet("all")]
    public IActionResult GetAllEvents()
    {
        var events = _eventService.GetAll();
        return Ok(events);
    }

    [Authorize]
    [HttpGet("event-previews")]
    public EventPreviewDto[] GetPreviews([FromQuery] DateTime date)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Array.Empty<EventPreviewDto>();

        return _eventService.GetPreviewByDateAndUser(date, userId);
    }

    [HttpGet("details")]
    public EventDetailsDto GetDetails([FromQuery] int eventId)
    {
        EventDetailsDto eventDetails = _eventService.GetEventById(eventId);
        return eventDetails;
    }

    [HttpGet("open")]
    public EventPreviewDto[] GetOpenEventsByDate([FromQuery] DateTime date)
    {
        return _eventService.GetPreviewOpenByDate(date);
    }

    [Authorize]
    [HttpPost("create")]
    public async Task<IActionResult> CreateEvent([FromBody] CreateEventDto dto)
    {
        // parse datetimes
        if (!DateTime.TryParse($"{dto.StartDate} {dto.StartTime}", out var start) ||
            !DateTime.TryParse($"{dto.EndDate} {dto.EndTime}", out var end))
            return BadRequest("Invalid date/time");

        if (end <= start)
            return BadRequest("End datetime must be after start datetime");

        // get organizer id from json web token
        var organizerIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (organizerIdClaim == null || !int.TryParse(organizerIdClaim, out int organizerId))
            return Unauthorized();

        var newEvent = new Event
        {
            Title = dto.Title,
            Description = dto.Description,
            RoomId = dto.RoomId,
            StartDate = start,
            EndDate = end,
            OrganizerId = organizerId,
            IsOpen = true
        };

        await _context.Events.AddAsync(newEvent);
        await _context.SaveChangesAsync();

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
            );

        if (affected == 0)
        {
            return NotFound();
        }

        return NoContent();
    }
}