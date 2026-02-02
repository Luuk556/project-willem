using System.Text.Json.Serialization;
using CalendarBackend.Model;

namespace MyBackend.Dtos;

public class EventAttendanceDto
{
    public int UserId { get; set; }
    public int EventId { get; set; }
    public bool AcceptedInvite { get; set; }

    public EventAttendanceDto(EventAttendees eventAttendees)
    {
        UserId = eventAttendees.UserId;
        EventId = eventAttendees.EventId;
        AcceptedInvite = eventAttendees.AcceptedInvite;
    }
    
    [JsonConstructor]
    public EventAttendanceDto(int userId, int eventId, bool acceptedInvite)
    {
        UserId = userId;
        EventId = eventId;
        AcceptedInvite = acceptedInvite;
    }
}