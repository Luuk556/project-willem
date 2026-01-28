namespace CalendarBackend.Dtos;
public class UpdateEventDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime StartDate{ get; set; }
    public DateTime EndDate{ get; set; }
    public int RoomId{ get; set; }
    public bool IsOpen { get; set; }
}