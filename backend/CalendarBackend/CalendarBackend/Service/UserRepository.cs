using CalendarBackend.Data;
using CalendarBackend.Model;

namespace CalendarBackend.Service;

public class UserRepository : Repository<User>
{
    public UserRepository(AppDbContext context) : base(context)
    {
        
    }
}