using CalendarBackend.Model;
using Microsoft.EntityFrameworkCore;

namespace CalendarBackend.Data;

public class AppDbContext : DbContext
{
    public DbSet<Event> Events { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<EventAttendees> EventAttendees { get; set; }
    public DbSet<Attendance> Attendances { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.UseSqlite("Data Source=Database.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<EventAttendees>().HasKey(_ => new { _.EventId, _.UserId });
    }
}