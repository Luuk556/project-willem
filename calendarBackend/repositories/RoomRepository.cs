using CalendarBackend.Data;
using CalendarBackend.Model;

namespace CalendarBackend.Service;

public class RoomRepository : Repository<Room>
{
    public RoomRepository(AppDbContext context) : base(context)
    {
        
    }

    public Room[] GetById(int id)
    {
        return _dbSet.Where(room => room.Id == id).ToArray();
    }

}