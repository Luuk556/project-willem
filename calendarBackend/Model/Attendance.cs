namespace CalendarBackend.Model;

public class Attendance
{
    public int Id { get; set; }
    public int RoomId { get; set; }
    public int UserId { get; set; }
    public DateTime Date { get; set; }
    
    public Room Room { get; set; }
    public User User { get; set; }
}