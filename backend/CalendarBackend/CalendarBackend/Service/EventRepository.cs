using CalendarBackend.Data;
using CalendarBackend.Model;

namespace CalendarBackend.Service;

public class EventRepository : Repository<Event>
{
    public EventRepository(AppDbContext context) : base(context)
    {
        
    }

    public Event[] GetByDate(DateTime date)
    {
        return _dbSet.Where(e => e.StartDate >= date && e.EndDate <= date).ToArray();
    }

}