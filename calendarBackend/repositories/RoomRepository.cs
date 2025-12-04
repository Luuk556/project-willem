using CalendarBackend.Data;
using CalendarBackend.Model;

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

    public Room[] GetAllRooms()
    {
        return _dbSet.Select(room => new Room
        {
            Id = room.Id,
            Name = room.Name
        }).ToArray();
    }

}