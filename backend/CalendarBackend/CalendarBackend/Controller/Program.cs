// See https://aka.ms/new-console-template for more information

using CalendarBackend.Data;
using CalendarBackend.Model;
using CalendarBackend.Service;

AppDbContext context = new AppDbContext();
EventRepository eventRepository = new EventRepository(context);

//var builder = WebApplication.CreateBuilder(args);
//var app = builder.Build();

//app.MapGet("/", () => "Hello World!");

//app.MapGet("/events-by-date/{date}",);

Console.WriteLine("Creating user");
Event newEvent = new Event()
{
    Title = "event title",
    Description= "",
    RoomId = 1,
    StartDate = new DateTime(2025, 11, 11, 13, 0, 0),
    EndDate = new DateTime(2025, 11, 11, 14, 0, 0),
    OrganizerId = 1,
    IsOpen = false
};
eventRepository.Create(newEvent);
eventRepository.SaveChanges();
Console.WriteLine("Created event");

int eventId = newEvent.Id;

Event? retrievedEvent = eventRepository.Get(eventId);
if (retrievedEvent == null)
{
    Console.WriteLine("Event could not be found");
    return;
}
Console.WriteLine("retrieved event with the name " + retrievedEvent.Title);
Console.WriteLine("Updating the title of the event");
Console.WriteLine("Current name: " + retrievedEvent.Title);
retrievedEvent.Title = "New Title";
eventRepository.Update(retrievedEvent);
eventRepository.SaveChanges();

Event? updatedEvent = eventRepository.Get(eventId);
if (updatedEvent == null)
{
    Console.WriteLine("Event could not be found");
    return;
}

Console.WriteLine("Updated name: " + retrievedEvent.Title);

Console.WriteLine("Deleting event. Currently there are " + eventRepository.GetCount() + " events");
eventRepository.Delete(updatedEvent);
eventRepository.SaveChanges();
Console.WriteLine("Deleted event Currently there are " + eventRepository.GetCount() + " events");



Event event1 = new Event()
{
    Title = "Daily standup",
    Description = "Long daily standup description so i can test how it would look if the description of this event is long.",
    RoomId = 9,
    StartDate = new DateTime(2025, 10, 3, 11, 0, 0),
    EndDate = new DateTime(2025, 10, 3, 11, 30, 0),
    OrganizerId = 1,
    IsOpen = false
};
Event event2 = new Event()
{
    Title = "P.O. meeting",
    Description = "Call with product owner",
    RoomId = 8,
    StartDate = new DateTime(2025, 10, 3, 15, 0, 0),
    EndDate = new DateTime(2025, 10, 3, 15, 45, 0),
    OrganizerId = 1,
    IsOpen = false
};
Event event3 = new Event()
{
    Title = "P.O. meeting part 2",
    Description = "Call with product owner",
    RoomId = 8,
    StartDate = new DateTime(2025, 10, 3, 15, 30, 0),
    EndDate = new DateTime(2025, 10, 3, 16, 30, 0),
    OrganizerId = 1,
    IsOpen = false
};
Event event4 = new Event()
{
    Title = "P.O. meeting part 3",
    Description = "Call with product owner",
    RoomId = 8,
    StartDate = new DateTime(2025, 10, 3, 16, 30, 0),
    EndDate = new DateTime(2025, 10, 3, 17, 30, 0),
    OrganizerId = 1,
    IsOpen = false
};
Event event5 = new Event()
{
    Title = "Daily standup",
    Description = "Daily standup description",
    RoomId = 9,
    StartDate = new DateTime(2025, 10, 4, 11, 0, 0),
    EndDate = new DateTime(2025, 10, 4, 11, 30, 0),
    OrganizerId = 1,
    IsOpen = false
};
Event event6 = new Event()
{
    Title = "Lunch",
    Description = "Lunch in canteen",
    RoomId = 0,
    StartDate = new DateTime(2025, 10, 4, 12, 30, 0),
    EndDate = new DateTime(2025, 10, 4, 13, 15, 0),
    OrganizerId = 1,
    IsOpen = true
};

//app.Run();
