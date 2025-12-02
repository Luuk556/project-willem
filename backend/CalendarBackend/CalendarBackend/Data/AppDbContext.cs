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
    
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<EventAttendees>().HasKey(_ => new { _.EventId, _.UserId });
        
        Seed(modelBuilder);
    }

    private void Seed(ModelBuilder modelBuilder)
    {
        // USERS
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Name = "John",
                Email = "John@gmail.com",
                Password = "password",
                Biography = "biography",
                Role = Role.User,
                ProfilePicture = null
            }
        );

        // EVENTS
        modelBuilder.Entity<Event>().HasData(
            new Event
            {
                Id = 2,
                Title = "Daily standup",
                Description =
                    "Long daily standup description so i can test how it would look if the description of this event is long.",
                RoomId = 9,
                StartDate = DateTime.Parse("2025-10-03 11:00:00"),
                EndDate = DateTime.Parse("2025-10-03 11:30:00"),
                OrganizerId = 1,
                IsOpen = false
            },
            new Event
            {
                Id = 3,
                Title = "P.O. meeting",
                Description = "Call with product owner",
                RoomId = 8,
                StartDate = DateTime.Parse("2025-10-03 15:00:00"),
                EndDate = DateTime.Parse("2025-10-03 15:45:00"),
                OrganizerId = 1,
                IsOpen = false
            },
            new Event
            {
                Id = 4,
                Title = "P.O. meeting part 2",
                Description = "Call with product owner",
                RoomId = 8,
                StartDate = DateTime.Parse("2025-10-03 15:30:00"),
                EndDate = DateTime.Parse("2025-10-03 16:30:00"),
                OrganizerId = 1,
                IsOpen = false
            },
            new Event
            {
                Id = 5,
                Title = "P.O. meeting part 3",
                Description = "Call with product owner",
                RoomId = 8,
                StartDate = DateTime.Parse("2025-10-03 16:30:00"),
                EndDate = DateTime.Parse("2025-10-03 17:30:00"),
                OrganizerId = 1,
                IsOpen = false
            },
            new Event
            {
                Id = 6,
                Title = "Daily standup",
                Description = "Daily standup description",
                RoomId = 9,
                StartDate = DateTime.Parse("2025-10-04 11:00:00"),
                EndDate = DateTime.Parse("2025-10-04 11:30:00"),
                OrganizerId = 1,
                IsOpen = false
            },
            new Event
            {
                Id = 7,
                Title = "Lunch",
                Description = "Lunch in canteen",
                RoomId = 0,
                StartDate = DateTime.Parse("2025-10-04 12:30:00"),
                EndDate = DateTime.Parse("2025-10-04 13:15:00"),
                OrganizerId = 1,
                IsOpen = true
            }
        );

        // EVENT ATTENDEES
        modelBuilder.Entity<EventAttendees>().HasData(
            // event 0 → does not exist in your events table, so we skip
            new EventAttendees { UserId = 0, EventId = 4 },
            new EventAttendees { UserId = 1, EventId = 4 },
            new EventAttendees { UserId = 2, EventId = 4 },
            new EventAttendees { UserId = 0, EventId = 5 },
            new EventAttendees { UserId = 1, EventId = 5 },
            new EventAttendees { UserId = 2, EventId = 5 },

            // 3,4,5 × events 1–3
            new EventAttendees { UserId = 3, EventId = 1 },
            new EventAttendees { UserId = 4, EventId = 1 },
            new EventAttendees { UserId = 5, EventId = 1 },

            new EventAttendees { UserId = 3, EventId = 2 },
            new EventAttendees { UserId = 4, EventId = 2 },
            new EventAttendees { UserId = 5, EventId = 2 },

            new EventAttendees { UserId = 3, EventId = 3 },
            new EventAttendees { UserId = 4, EventId = 3 },
            new EventAttendees { UserId = 5, EventId = 3 }
        );
    }
}