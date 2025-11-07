namespace CalendarBackend.Model;

public class Event
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int RoomId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int OrganizerId { get; set; }
    public bool IsOpen { get; set; }
}