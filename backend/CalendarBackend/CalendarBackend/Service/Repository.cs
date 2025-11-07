using CalendarBackend.Data;
using Microsoft.EntityFrameworkCore;

namespace CalendarBackend.Service;

public class Repository<T> where T : class
{
    protected AppDbContext _context;
    protected DbSet<T> _dbSet;

    public Repository(AppDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }
    public void Create(T entity)
    {
        _dbSet.Add(entity);
        _context.SaveChanges();
    }

    public T? Get(int id)
    {
        return _dbSet.Find(id);
    }

    public T[] GetAll()
    {
        return  _dbSet.ToArray();
    }

    public void Update(T entity)
    {
        _dbSet.Update(entity);
        _context.SaveChanges();
    }

    public void Delete(T entity)
    {
        _dbSet.Remove(entity);
        _context.SaveChanges();
    }
}