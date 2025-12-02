using CalendarBackend.Data;
using CalendarBackend.Model;

namespace CalendarBackend.Service;

public class EventService
{
    private EventRepository _eventRepository;
    private EventAttendanceRepository _eventAttendanceRepository;
    public EventService(AppDbContext context)
    {
         _eventRepository = new EventRepository(context);
         _eventAttendanceRepository = new  EventAttendanceRepository(context);
    }
    
    public EventPreview[] GetPreviewByDateAndUser(DateTime date, int userId)
    {
        DateTime dateStart = date.Date;
        DateTime dateEnd = dateStart.AddDays(1).AddTicks(-1);
        int[] includedIds = _eventAttendanceRepository.GetEventsIdsByUser(userId);
        return _eventRepository.GetPreviewByDateAndIdList(dateStart, dateEnd, includedIds);
    }

    public EventPreview[] GetPreviewOpenByDate(DateTime date)
    {
        DateTime dateStart = date.Date;
        DateTime dateEnd = dateStart.AddDays(1).AddTicks(-1);
        return _eventRepository.GetPreviewOpenByDate(dateStart, dateEnd);
    }

    public EventPreview[] GetEventByRoomAndDate(DateTime date, int roomId)
    {
        DateTime dateStart = date.Date;
        DateTime dateEnd = dateStart.AddDays(1).AddTicks(-1);
        return _eventRepository.GetEventByRoomAndDate(roomId,  dateStart, dateEnd);
    }

    public Event GetEventById(int id)
    {
        return _eventRepository.GetEventById(id);
    }
}