using System.Security.Claims;
using CalendarBackend.Data;
using CalendarBackend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyBackend.Dtos;

namespace CalendarBackend.Controllers;
[ApiController]
[Route("event")]
public class EventController : ControllerBase
{
    private EventService _eventService;
    public EventController(AppDbContext context)
    {
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
    public EventPreviewDto[] GetPreviews([FromQuery]DateTime date)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return [];
        return _eventService.GetPreviewByDateAndUser(date, userId);
    }
    
    [HttpGet("details")]
    public EventDetailsDto GetDetails([FromQuery]int eventId)
    {
        EventDetailsDto eventDetails = _eventService.GetEventById(eventId);
        return eventDetails;
    }
    
    [HttpGet("open")]
    public EventPreviewDto[] GetOpenEventsByDate([FromQuery]DateTime date)
    {
        return _eventService.GetPreviewOpenByDate(date);
    }
    
}