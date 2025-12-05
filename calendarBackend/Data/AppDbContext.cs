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
        modelBuilder.Entity<Event>()
            .HasMany(e => e.Attendees)
            .WithMany(u => u.Events)
            .UsingEntity<EventAttendees>(
                _ => _
                    .HasOne(ea => ea.User)
                    .WithMany()
                    .HasForeignKey(ea => ea.UserId),
                _ => _
                    .HasOne(ea => ea.Event)
                    .WithMany()
                    .HasForeignKey(ea => ea.EventId)
            );
        
        modelBuilder.Entity<Event>()
            .HasOne(e => e.Organizer)
            .WithMany(u => u.OrganizedEvents)
            .HasForeignKey(e => e.OrganizerId)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<Event>()
            .HasOne(e => e.Room)
            .WithMany()
            .HasForeignKey(e => e.RoomId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
        
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
            },
            new User
            {
                Id = 2,
                Name = "Kees",
                Email = "Kees@gmail.com",
                Password = "password",
                Biography = "biography",
                Role = Role.User,
                ProfilePicture = null
            },
            new User
            {
                Id = 3,
                Name = "Jan",
                Email = "Jan@gmail.com",
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
                Id = 1,
                    Title = "Daily standup",
                    Description =
                    "Long daily standup description so i can test how it would look if the description of this event is long.",
                    RoomId = 10,
                    StartDate = DateTime.Parse("2025-10-05 15:00:00"),
                    EndDate = DateTime.Parse("2025-10-05 15:30:00"),
                    OrganizerId = 1,
                    IsOpen = false
            },
            new Event
            {
                Id = 2,
                Title = "Daily standup",
                Description =
                    "Long daily standup description so i can test how it would look if the description of this event is long.",
                RoomId = 10,
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
                RoomId = 9,
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
                RoomId = 9,
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
                RoomId = 9,
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
                RoomId = 10,
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
                RoomId = 1,
                StartDate = DateTime.Parse("2025-10-04 12:30:00"),
                EndDate = DateTime.Parse("2025-10-04 13:15:00"),
                OrganizerId = 1,
                IsOpen = true
            },
            new Event
            {
                Id = 8,
                Title = "Ping pong",
                Description = "",
                RoomId = 9,
                StartDate = DateTime.Parse("2025-10-03 19:30:00"),
                EndDate = DateTime.Parse("2025-10-03 20:30:00"),
                OrganizerId = 1,
                IsOpen = true
            }
        );

        // EVENT ATTENDEES
        modelBuilder.Entity<EventAttendees>().HasData(
            new EventAttendees { UserId = 3, EventId = 4 },
            new EventAttendees { UserId = 1, EventId = 4 },
            new EventAttendees { UserId = 2, EventId = 4 },
            
            new EventAttendees { UserId = 3, EventId = 5 },
            new EventAttendees { UserId = 1, EventId = 5 },
            new EventAttendees { UserId = 2, EventId = 5 },
            
            new EventAttendees { UserId = 3, EventId = 1 },
            new EventAttendees { UserId = 2, EventId = 1 },
            new EventAttendees { UserId = 1, EventId = 1 },

            new EventAttendees { UserId = 1, EventId = 2 },

            new EventAttendees { UserId = 3, EventId = 3 },
            new EventAttendees { UserId = 1, EventId = 3 }
        );

        modelBuilder.Entity<Room>().HasData(
            new Room { Id = 1, Name = "Canteen", Capacity = 10, PositionX = 65, PositionY = 10, SizeX = 25, SizeY = 25 },
            new Room { Id = 2, Name = "Entrance Hall", Capacity = 10, PositionX = 35, PositionY = 10, SizeX = 30, SizeY = 40 },
            new Room { Id = 3, Name = "Kitchen", Capacity = 10, PositionX = 65, PositionY = 35, SizeX = 25, SizeY = 15 },
            new Room { Id = 4, Name = "Room 001", Capacity = 10, PositionX = 15, PositionY = 10, SizeX = 20, SizeY = 10 },
            new Room { Id = 5, Name = "Room 002", Capacity = 10, PositionX = 15, PositionY = 20, SizeX = 5, SizeY = 35 },
            new Room { Id = 6, Name = "Room 003", Capacity = 10, PositionX = 25, PositionY = 25, SizeX = 10, SizeY = 25 },
            new Room { Id = 7, Name = "Room 004", Capacity = 10, PositionX = 15, PositionY = 55, SizeX = 25, SizeY = 10 },
            new Room { Id = 8, Name = "Room 005", Capacity = 10, PositionX = 45, PositionY = 55, SizeX = 30, SizeY = 10 },
            new Room { Id = 9, Name = "Room 006", Capacity = 10, PositionX = 75, PositionY = 50, SizeX = 15, SizeY = 15 },
            new Room { Id = 10, Name = "Room 007", Capacity = 10, PositionX = 25, PositionY = 65, SizeX = 15, SizeY = 10 },
            new Room { Id = 11, Name = "Room 008", Capacity = 10, PositionX = 45, PositionY = 65, SizeX = 15, SizeY = 10 },
            new Room { Id = 12, Name = "Room 009", Capacity = 10, PositionX = 25, PositionY = 75, SizeX = 35, SizeY = 10 }
        );
    }
}