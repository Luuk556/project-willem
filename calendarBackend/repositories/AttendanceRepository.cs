using CalendarBackend.Data;
using CalendarBackend.Model;

namespace CalendarBackend.Service;

public class AttendanceRepository: Repository<Attendance>
{
    public AttendanceRepository(AppDbContext context) : base(context){}

    // Gets the user id and date
    public Attendance? GetAttendanceByUserAndDate(int userId, DateTime date)
    {
        // Gets the room day and calculates the end date
        var start = date.Date;
        var end = start.AddDays(1);

        return _dbSet
        .Where(attendance => attendance.UserId == userId && attendance.StartDate >= start && attendance.StartDate < end && attendance.EndDate == null)
        .OrderByDescending(attendance => attendance.StartDate)
        .FirstOrDefault();
    }

    // This is the active attendance without end date
    public Attendance? GetAttendanceByUserId(int userId)
    {
        return _dbSet
        .Where(attendance => attendance.UserId == userId && attendance.EndDate == null)
        .OrderByDescending(attendance => attendance.StartDate)
        .FirstOrDefault();
    }

    // Get all attendances in a room
    public List<User> GetActiveUsersByRoom(int roomId)
    {
        return _dbSet
            .Where(a => a.RoomId == roomId && a.EndDate == null)
            .Select(a => a.User)
            .ToList();
    }
}