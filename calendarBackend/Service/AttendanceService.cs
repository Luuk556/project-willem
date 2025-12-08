using CalendarBackend.Model;

namespace CalendarBackend.Service;

public class AttendanceService
{
    private readonly AttendanceRepository _attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository)
    {
        _attendanceRepository = attendanceRepository;
    }

    // add attendance
    public void AddAttendance(int userId, int roomId)
    {
        var now = DateTime.Now;

        var attendance = new Attendance
        {
            UserId = userId,
            RoomId = roomId,
            StartDate = now,
            EndDate = null
        };

        _attendanceRepository.Create(attendance);
        _attendanceRepository.SaveChanges();
    }

    // attandence update
    public void UpdateAttendance(int userId, int roomId)
    {
        var today = DateTime.Now.Date;
        var attendance = _attendanceRepository.GetAttendanceByUserAndDate(userId, today);

        if (attendance == null)
        {
            // if there is no attendance today create a new one
            AddAttendance(userId, roomId);
            return;
        }

        attendance.RoomId = roomId;
        _attendanceRepository.Update(attendance);
        _attendanceRepository.SaveChanges();
    }

    // end attendance
    public void EndAttendance(int userId)
    {
        var activeAttendance = _attendanceRepository.GetAttendanceByUserId(userId);
        if (activeAttendance == null) return;

        activeAttendance.EndDate = DateTime.Now;
        _attendanceRepository.Update(activeAttendance);
        _attendanceRepository.SaveChanges();
    }

    // get attendance for today
    public Attendance? GetTodayAttendance(int userId)
    {
        return _attendanceRepository.GetAttendanceByUserAndDate(userId, DateTime.Now.Date);
    }
}
