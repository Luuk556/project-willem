namespace CalendarBackend.Model;

public class EventAttendees
{
    public int UserId { get; set; }
    public User User { get; set; }

    public int EventId { get; set; }
    public Event Event { get; set; }
    
    public bool AcceptedInvite { get; set; } = false;
}
