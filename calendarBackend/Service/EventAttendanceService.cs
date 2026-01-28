using CalendarBackend.Data;
using CalendarBackend.Model;
using MyBackend.Dtos;

namespace CalendarBackend.Service;

public class EventAttendanceService
{
    private EventAttendanceRepository _eventAttendanceRepository;
    public EventAttendanceService(AppDbContext context)
    {
        _eventAttendanceRepository = new  EventAttendanceRepository(context);
    }

    public async Task CreateAttendance(int userId, int eventId, bool acceptedInvite)
    {
        EventAttendees attendee = new EventAttendees { EventId = eventId, UserId = userId, AcceptedInvite = acceptedInvite};
        _eventAttendanceRepository.Create(attendee);
        await _eventAttendanceRepository.SaveChangesAsync();
    }
    
    public async Task DeleteAttendance(int userId, int eventId)
    {
        EventAttendees attendee = _eventAttendanceRepository.GetByUserAndEvent(userId, eventId);
        _eventAttendanceRepository.Delete(attendee);
        await _eventAttendanceRepository.SaveChangesAsync();
    }

    public EventAttendanceDto GetAttendance(int userId, int eventId)
    {
        return new EventAttendanceDto(_eventAttendanceRepository.GetByUserAndEvent(userId, eventId));
    }
    
    public async Task UpdateAttendance(int eventId, int userId, bool acceptedInvite)
    {
        var attendance = _eventAttendanceRepository
            .GetByUserAndEvent(userId, eventId);

        if (attendance == null)
        {
            throw new UnauthorizedAccessException("User is not invited to this event");
        }

        attendance.AcceptedInvite = acceptedInvite;

        await _eventAttendanceRepository.SaveChangesAsync();
    }
}