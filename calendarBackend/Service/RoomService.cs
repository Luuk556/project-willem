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
        // haalt alle rooms uit DB en mapt naar DTO
        return _roomRepository.GetAll()
            .Select(r => new RoomMinimalDto
            {
                Id = r.Id,
                Name = r.Name
            })
            .ToArray();
    }

}