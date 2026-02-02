using CalendarBackend.Model;

namespace MyBackend.Dtos;

public class AttendanceDto
{
    public int Id { get; set; }
    public int RoomId { get; set; }
    public int UserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    public AttendanceDto(Attendance attendance)
    {
        Id = attendance.Id;
        RoomId = attendance.RoomId;
        StartDate = attendance.StartDate;
        EndDate = attendance.EndDate;
        UserId = attendance.UserId;
    }
}