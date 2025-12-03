using CalendarBackend.Data;
using CalendarBackend.Model;
using Microsoft.EntityFrameworkCore;

namespace CalendarBackend.Service;

public class EventRepository : Repository<Event>
{
    public EventRepository(AppDbContext context) : base(context)
    {
        
    }

    public EventPreview[] GetPreviewByDateAndIdList(DateTime dateStart, DateTime dateEnd, int[] includedIds)
    {
        return _dbSet
            .Where(e => e.StartDate <= dateEnd && e.EndDate >= dateStart && includedIds.Contains(e.Id))
            .Select(e => new EventPreview{Id = e.Id, StartDate = e.StartDate, EndDate = e.EndDate, Title = e.Title})
            .ToArray();
    }
    
    public EventPreview[] GetPreviewOpenByDate(DateTime dateStart, DateTime dateEnd)
    {
        return _dbSet
            .Where(e => e.StartDate <= dateEnd && e.EndDate >= dateStart && e.IsOpen)
            .Select(e => new EventPreview{Id = e.Id, StartDate = e.StartDate, EndDate = e.EndDate, Title = e.Title})
            .ToArray();
    }

    public Event GetEventById(int id)
    {
        return _dbSet
            .Include(e => e.Room)
            .Include(e => e.Attendees)
            .FirstOrDefault(e => e.Id == id);
    }

    public EventPreview[] GetEventByRoomAndDate(int roomId, DateTime dateStart, DateTime dateEnd)
    {

        return _dbSet
            .Where(e => e.StartDate <= dateEnd && e.EndDate >= dateStart && e.RoomId == roomId && e.IsOpen)
            .Select(e => new EventPreview{Id = e.Id, StartDate = e.StartDate, EndDate = e.EndDate, Title = e.Title})
            .ToArray();
    }

    public EventPreview[] GetMultipleById(int[] ids)
    {
        return _dbSet
            .Where(e => ids.Contains(e.Id))
            .Select(e => new EventPreview{Id = e.Id, StartDate = e.StartDate, EndDate = e.EndDate, Title = e.Title})
            .ToArray();
    }
}