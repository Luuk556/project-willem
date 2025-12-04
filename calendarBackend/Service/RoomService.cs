using CalendarBackend.Data;
using CalendarBackend.Model;
using MyBackend.Dtos;

namespace CalendarBackend.Service;

public class RoomService
{
    private RoomRepository _roomRepository;
    public RoomService(AppDbContext context)
    {
        _roomRepository = new RoomRepository(context);
    }

    public Room GetById(int id)
    {
        return _roomRepository.GetById(id);
    }

    public RoomMinimalDto[] GetAllRooms()
    {
        return _roomRepository.GetAllRooms();
    }
}