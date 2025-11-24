using Microsoft.EntityFrameworkCore;
using calendarBackend.Models;

namespace calendarBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventAttendee> EventAttendeeses { get; set; }
    }
}