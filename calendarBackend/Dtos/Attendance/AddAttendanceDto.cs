using CalendarBackend.Model;

namespace MyBackend.Dtos;
public class AddAttendanceDto
{
    public int UserId { get; set; }
    public int RoomId { get; set; }
}