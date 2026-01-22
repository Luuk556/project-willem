using System.Security.Claims;
using CalendarBackend.Data;
using CalendarBackend.Model;
using MyBackend.Dtos;

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

    public Event[] GetAll()
    {
        return _eventRepository.GetAll();
    }
    
    public EventPreviewDto[] GetPreviewByDateAndUser(DateTime date, int userId)
    {
        DateTime dateStart = date.Date;
        DateTime dateEnd = dateStart.AddDays(1).AddTicks(-1);
        int[] includedIds = _eventAttendanceRepository.GetEventsIdsByUser(userId);
        return _eventRepository.GetPreviewByDateAndIdList(dateStart, dateEnd, includedIds);
    }

    public EventPreviewDto[] GetPreviewOpenByDate(DateTime date)
    {
        DateTime dateStart = date.Date;
        DateTime dateEnd = dateStart.AddDays(1).AddTicks(-1);
        return _eventRepository.GetPreviewOpenByDate(dateStart, dateEnd);
    }

    public EventPreviewDto[] GetEventByRoomAndDate(DateTime date, int roomId)
    {
        DateTime dateStart = date.Date;
        DateTime dateEnd = dateStart.AddDays(1).AddTicks(-1);
        return _eventRepository.GetEventByRoomAndDate(roomId,  dateStart, dateEnd);
    }

    public EventDetailsDto GetEventById(int id)
    {
        Event evt =  _eventRepository.GetEventById(id);
        
        return new EventDetailsDto
        {
            Id = evt.Id,
            Title = evt.Title,
            Description = evt.Description,
            StartDate = evt.StartDate,
            EndDate = evt.EndDate,
            OrganizerId = evt.OrganizerId,
            IsOpen = evt.IsOpen,
            RoomMinimal = new RoomMinimalDto
            {
                Id = evt.Room.Id,
                Name = evt.Room.Name
            },
            Attendees = evt.Attendees
                .Select(u => new UserMinimalDto
                {
                    Id = u.Id,
                    Name = u.Name
                })
                .ToList()
        };
        
    }

    public bool GetHasEventOnDate(DateTime date, int roomId)
    {
        return _eventRepository.getRoomHasEventOnDate(date, roomId);
    }

    public EventPreviewDto[] GetMyEvents(int userId)
    {
        int[] eventIds = _eventAttendanceRepository.GetEventsIdsByUser(userId);
        return _eventRepository.GetMultipleById(eventIds);
    }
}