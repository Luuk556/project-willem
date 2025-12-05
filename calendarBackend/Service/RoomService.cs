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

    public Room GetById(int id)
    {
        return _roomRepository.GetById(id);
    }

    public RoomMinimalDto[] GetAllRoomMinimal()
    {
        // haalt alle rooms uit DB en mapt naar DTO
        return _roomRepository.GetAll()
            .Select(r => new RoomMinimalDto
            {
                Id = r.Id,
                Name = r.Name
            })
            .ToArray();
    }

    public RoomMapDto[] GetAllRoomsForMap(DateTime date)
    {
        List<RoomMapDto> result = new List<RoomMapDto>();
        Room[] rooms = _roomRepository.GetAll();

        foreach (Room room in rooms)
        {
            RoomMapDto r = new RoomMapDto
            {
                Capacity = room.Capacity,
                Id = room.Id,
                Name = room.Name,
                PositionX = room.PositionX,
                PositionY = room.PositionY,
                SizeX = room.SizeX,
                SizeY = room.SizeY,
                IsAvailable = !_eventRepository.getRoomHasEventOnDate(date, room.Id)
            };
            result.Add(r);
        }

        return result.ToArray();
    }

    public Room[] GetAll()
    {
        return _roomRepository.GetAll();
    }
    

}