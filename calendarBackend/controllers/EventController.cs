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
    public EventPreviewDto[] PutEvent([FromQuery]DateTime date)
    {
            var affected = await _context.Event
                .Where(r => r.Id == id)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(r => r.Name, room.Name)
                    .SetProperty(r => r.Capacity, room.Capacity)
                    .SetProperty(r => r.SizeX, room.SizeX)
                    .SetProperty(r => r.SizeY, room.SizeY)
                    .SetProperty(r => r.PositionX, room.PositionX)
                    .SetProperty(r => r.PositionY, room.PositionY)
                );
    }
    
}