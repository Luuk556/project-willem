using CalendarBackend.Data;
using CalendarBackend.Service;
using Microsoft.AspNetCore.Mvc;
using MyBackend.Dtos;

namespace CalendarBackend.Controllers;
[ApiController]
[Route("event")]

public class EventController : Controller
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
    
    
    [HttpGet("event-previews")]
    public EventPreviewDto[] GetPreviews([FromQuery]DateTime date)
    {
        return _eventService.GetPreviewByDateAndUser(date, 1);
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

    [HttpPut("edit/{id}")]
    public async Task<IActionResult> PutEvent(int id, [FromBody] UpdateEventDto event_u)
    {
            var affected = await _context.Event
                .Where(e => e.Id == id)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(e => e.Title, event_u.Title)
                    .SetProperty(e => e.Description, event_u.Description)
                );
    }
    
}