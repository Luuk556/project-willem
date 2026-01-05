namespace CalendarBackend.Dtos;
public class UpdateEventDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Date{ get; set; }
    public int? RoomId{ get; set; }
}