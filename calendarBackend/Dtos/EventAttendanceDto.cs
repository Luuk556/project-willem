namespace MyBackend.Dtos;

public class EventAttendanceDto
{
    public int UserId { get; set; }
    public int EventId { get; set; }
    public bool AcceptedInvite { get; set; }
}