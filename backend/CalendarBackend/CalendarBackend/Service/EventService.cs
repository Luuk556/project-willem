using CalendarBackend.Data;
using CalendarBackend.Model;

namespace CalendarBackend.Service;

public class EventService
{
    private EventRepository _eventRepository;
    public EventService(AppDbContext context)
    {
         _eventRepository = new EventRepository(context);
    }
    //
    // public EventPreview[] GetPreviewByDateAndUser(DateTime date)
    // {
    //     DateTime dateStart = date.Date;
    //     DateTime dateEnd = dateStart.AddDays(1).AddTicks(-1);
    //     return _eventRepository.GetPreviewByDateAndUser(dateStart, dateEnd);
    //     
    // }

    public EventPreview[] GetPreviewOpenByDate(DateTime date)
    {
        DateTime dateStart = date.Date;
        DateTime dateEnd = dateStart.AddDays(1).AddTicks(-1);
        return _eventRepository.GetPreviewOpenByDate(dateStart, dateEnd);
    }
}