using CalendarBackend.Data;
using CalendarBackend.Model;

namespace CalendarBackend.Service;

public class EventAttendanceService
{
    private EventAttendanceRepository _eventAttendanceRepository;
    public EventAttendanceService(AppDbContext context)
    {
        _eventAttendanceRepository = new  EventAttendanceRepository(context);
    }

    public async Task CreateAttendance(int userId, int eventId)
    {
        EventAttendees attendee = new EventAttendees { EventId = eventId, UserId = userId };
        _eventAttendanceRepository.Create(attendee);
        await _eventAttendanceRepository.SaveChangesAsync();
    }
    
    public async Task DeleteAttendance(int userId, int eventId)
    {
        EventAttendees attendee = _eventAttendanceRepository.GetByUserAndEvent(userId, eventId);
        _eventAttendanceRepository.Delete(attendee);
        await _eventAttendanceRepository.SaveChangesAsync();
    }

    public EventAttendees GetAttendance(int userId, int eventId)
    {
        return _eventAttendanceRepository.GetByUserAndEvent(userId, eventId);
    }
    
}