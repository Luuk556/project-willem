using CalendarBackend.Data;
using CalendarBackend.Model;
using CalendarBackend.Service;
using Microsoft.AspNetCore.Mvc;

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
    [HttpGet("event-previews")]
    public EventPreview[] GetPreviews([FromQuery]DateTime date)
    {
        return _eventService.GetPreviewByDateAndUser(date, 0);
    }
    
    [HttpGet("details")]
    public Event GetDetails([FromQuery]int eventId)
    {
        return _eventService.GetEventById(eventId);
    }
}