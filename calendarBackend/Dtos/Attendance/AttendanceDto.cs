using CalendarBackend.Model;

namespace MyBackend.Dtos;

public class AttendanceDto
{
    public int Id { get; set; }
    public int RoomId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    public AttendanceDto(Attendance attendance)
    {
        if (attendance == null) return;
        Id = attendance.Id;
        RoomId = attendance.RoomId;
        StartDate = attendance.StartDate;
        EndDate = attendance.EndDate;
    }
}