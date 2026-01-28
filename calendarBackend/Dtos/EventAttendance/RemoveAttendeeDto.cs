using System.Text.Json.Serialization;
using CalendarBackend.Model;

namespace MyBackend.Dtos;

public class RemoveAttendeeDto
{
    public int EventId { get; set; }
    public int UserId { get; set; }

    [JsonConstructor]
    public RemoveAttendeeDto(int eventId, int userId)
    {
        EventId = eventId;
        UserId = userId;
    }

    public RemoveAttendeeDto(EventAttendees eventAttendees)
    {
        EventId = eventAttendees.EventId;
        UserId = eventAttendees.UserId;
    }
}