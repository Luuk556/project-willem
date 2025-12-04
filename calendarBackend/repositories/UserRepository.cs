using CalendarBackend.Data;
using CalendarBackend.Model;

namespace CalendarBackend.Service;

public class UserRepository : Repository<User>
{
    public UserRepository(AppDbContext context) : base(context)
    {
        
    }
    
    public User GetById(int id)
    {
        return _dbSet.FirstOrDefault(e => e.Id == id);
    }
    
}