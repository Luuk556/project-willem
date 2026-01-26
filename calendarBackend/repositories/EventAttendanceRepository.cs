using CalendarBackend.Data;
using CalendarBackend.Model;

namespace CalendarBackend.Service;

public class EventAttendanceRepository : Repository<EventAttendees>
{
    public EventAttendanceRepository(AppDbContext context) : base(context)
    {
        
    }

    public int[] GetUserIdsByEvent(int eventId)
    {
        return _dbSet.Where(a => a.EventId == eventId).Select(a => a.UserId).ToArray();
    }
    

    public EventAttendees GetByUserAndEvent(int userId, int eventId)
    {
        return _dbSet.Where(a => a.UserId == userId && a.EventId == eventId).SingleOrDefault();
    }

    public int[] GetUserInvitations(int userId)
    {
        return _dbSet.Where(a => a.UserId == userId && a.AcceptedInvite == false).Select(a => a.EventId).ToArray();
    }
    
    public int[] GetUserAcceptedInvitations(int userId)
    {
        return _dbSet.Where(a => a.UserId == userId && a.AcceptedInvite == true).Select(a => a.EventId).ToArray();
    }
    
}