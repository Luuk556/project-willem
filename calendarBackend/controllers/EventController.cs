using System.Security.Claims;
using CalendarBackend.Data;
using CalendarBackend.Model;
using CalendarBackend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyBackend.Dtos;
using Microsoft.EntityFrameworkCore;
using CalendarBackend.Dtos;

namespace CalendarBackend.Controllers
{
    [ApiController]
    [Route("event")]
    public class EventController : ControllerBase
    {
        private EventService _eventService;
        private readonly AppDbContext _context;

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
    }
}
