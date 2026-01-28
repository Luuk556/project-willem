using System.Security.Claims;
using CalendarBackend.Data;
using CalendarBackend.Model;
using Microsoft.AspNetCore.Mvc;
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

    public EventDetailsDto[] GetAll()
    {
        return _eventRepository.GetAll().Select(e => new EventDetailsDto(e)).ToArray();
    }
    
    public EventPreviewDto[] GetPreviewByDateAndUser(DateTime date, int userId)
    {
        DateTime dateStart = date.Date;
        DateTime dateEnd = dateStart.AddDays(1).AddTicks(-1);
        int[] includedIds = _eventAttendanceRepository.GetUserAcceptedInvitations(userId);
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

    public EventDetailsDto? GetEventById(int id)
    {
        Event eventData = _eventRepository.GetEventById(id);
        if (eventData == null)
        {
            return null;
        }
        EventDetailsDto result =  new EventDetailsDto(eventData);
        
        result.Attendees.ForEach(a =>
        {
            a.AcceptedInvite = _eventAttendanceRepository.GetByUserAndEvent(a.Id, result.Id).AcceptedInvite;
        });
        return result;
    }

    public bool GetHasEventOnDate(DateTime date, int roomId)
    {
        return _eventRepository.getRoomHasEventOnDate(date, roomId);
    }

    public EventPreviewDto[] GetMyEvents(int userId)
    {
        return _eventRepository.GetEventByOrganizer(userId);
    }

    public void Update(Event eventData)
    {
        _eventRepository.Update(eventData);
    }

    public async Task<int> DeleteById(int id, int userId)
    {
        Event? eventToDelete = _eventRepository.GetEventById(id);
        if (eventToDelete == null)
        {
            return 2;
        }
        if (userId != eventToDelete.OrganizerId)
        {
            return 1;
        }
        _eventRepository.Delete(eventToDelete);
        await _eventRepository.SaveChangesAsync();
        return 0;
    }
    public EventPreviewDto[] GetUserInvitations(int userId)
    {
        int[] eventIds =  _eventAttendanceRepository.GetUserInvitations(userId);
        EventPreviewDto[] events = _eventRepository.GetMultipleById(eventIds);
        return events.Where(e => GetEventById(e.Id).OrganizerId != userId).ToArray();
    }
    
    public EventPreviewDto[] GetUserAcceptedInvitations(int userId)
    {
        int[] eventIds = _eventAttendanceRepository.GetUserAcceptedInvitations(userId);
        EventPreviewDto[] events = _eventRepository.GetMultipleById(eventIds);
        return events.Where(e => GetEventById(e.Id).OrganizerId != userId).ToArray();
    }
}