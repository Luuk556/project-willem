using CalendarBackend.Data;
using CalendarBackend.Model;
using MyBackend.Dtos;

namespace CalendarBackend.Service;

public class RoomService
{
    private RoomRepository _roomRepository;
    private EventRepository _eventRepository;
    public RoomService(AppDbContext context)
    {
        _roomRepository = new RoomRepository(context);
        _eventRepository = new EventRepository(context);
    }

    public RoomDto GetById(int id)
    {
        return new RoomDto(_roomRepository.GetById(id));
    }

    public RoomMinimalDto[] GetAllRoomMinimal()
    {
        return _roomRepository.GetAll()
            .Select(r => new RoomMinimalDto(r))
            .ToArray();
    }

    public RoomDto[] GetAllRoomsForMap(DateTime date)
    {
        List<RoomDto> result = new List<RoomDto>();
        RoomDto[] rooms = _roomRepository.GetAll().Select(r => new RoomDto(r)).ToArray();

        foreach (RoomDto room in rooms)
        {

            room.IsAvailable = !_eventRepository.getRoomHasEventOnDate(date, room.Id);
        };
        return result.ToArray();
    }

    public RoomDto[] GetAll()
    {
        return _roomRepository.GetAll().Select(r => new RoomDto(r)).ToArray();
    }
}