using CalendarBackend.Model;

namespace MyBackend.Dtos;

public class RemoveAttendeeDto
{
    public int EventId { get; set; }
    public int UserId { get; set; }

    public RemoveAttendeeDto(EventAttendees eventAttendees)
    {
        EventId = eventAttendees.EventId;
        UserId = eventAttendees.UserId;
    }
}