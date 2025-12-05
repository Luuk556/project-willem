using CalendarBackend.Data;
using CalendarBackend.Model;
using Microsoft.EntityFrameworkCore;
using MyBackend.Dtos;

namespace CalendarBackend.Service;

public class EventRepository : Repository<Event>
{
    public EventRepository(AppDbContext context) : base(context)
    {
        
    }

    public EventPreviewDto[] GetPreviewByDateAndIdList(DateTime dateStart, DateTime dateEnd, int[] includedIds)
    {
        return _dbSet
            .Where(e => e.StartDate <= dateEnd && e.EndDate >= dateStart && includedIds.Contains(e.Id))
            .Select(e => new EventPreviewDto{Id = e.Id, StartDate = e.StartDate, EndDate = e.EndDate, Title = e.Title})
            .ToArray();
    }
    
    public EventPreviewDto[] GetPreviewOpenByDate(DateTime dateStart, DateTime dateEnd)
    {
        return _dbSet
            .Where(e => e.StartDate <= dateEnd && e.EndDate >= dateStart && e.IsOpen == true)
            .Select(e => new EventPreviewDto{Id = e.Id, StartDate = e.StartDate, EndDate = e.EndDate, Title = e.Title})
            .ToArray();
    }

    public Event GetEventById(int id)
    {
        return _dbSet
            .Include(e => e.Room)
            .Include(e => e.Attendees)
            .FirstOrDefault(e => e.Id == id);
    }

    public EventPreviewDto[] GetEventByRoomAndDate(int roomId, DateTime dateStart, DateTime dateEnd)
    {

        return _dbSet
            .Where(e => e.StartDate <= dateEnd && e.EndDate >= dateStart && e.RoomId == roomId && e.IsOpen)
            .Select(e => new EventPreviewDto{Id = e.Id, StartDate = e.StartDate, EndDate = e.EndDate, Title = e.Title})
            .ToArray();
    }

    public EventPreviewDto[] GetMultipleById(int[] ids)
    {
        return _dbSet
            .Where(e => ids.Contains(e.Id))
            .Select(e => new EventPreviewDto{Id = e.Id, StartDate = e.StartDate, EndDate = e.EndDate, Title = e.Title})
            .ToArray();
    }
}