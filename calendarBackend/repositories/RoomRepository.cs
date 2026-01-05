using CalendarBackend.Data;
using CalendarBackend.Model;
using MyBackend.Dtos;

namespace CalendarBackend.Service;

public class RoomRepository : Repository<Room>
{
    public RoomRepository(AppDbContext context) : base(context)
    {
        
    }

    public Room GetById(int id)
    {
        return _dbSet.FirstOrDefault(e => e.Id == id);
    }

    public RoomMinimalDto[] GetAllRooms()
    {
        return _dbSet.Select(room => new RoomMinimalDto
        {
            Id = room.Id,
            Name = room.Name
        }).ToArray();
    }
}