// See https://aka.ms/new-console-template for more information

using CalendarBackend.Data;
using CalendarBackend.Model;
using CalendarBackend.Service;

AppDbContext context = new AppDbContext();
EventRepository eventRepository = new EventRepository(context);

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.Run();

Console.WriteLine("Creating event");
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
Console.WriteLine("");

Console.WriteLine("Retrieving event");
int eventId = newEvent.Id;

Event? retrievedEvent = eventRepository.Get(eventId);
if (retrievedEvent == null)
{
    Console.WriteLine("Event could not be found");
    return;
}
Console.WriteLine("retrieved event with the name " + retrievedEvent.Title);
Console.WriteLine("");


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
Console.WriteLine("");

Console.WriteLine("Deleting event. Currently there are " + eventRepository.GetCount() + " events");
eventRepository.Delete(updatedEvent);
eventRepository.SaveChanges();
Console.WriteLine("Deleted event Currently there are " + eventRepository.GetCount() + " events");
Console.WriteLine("");

DateTime targetDate = new DateTime(2025, 10, 3);
Console.WriteLine("Retrieving all events on a specific date ( " + targetDate.ToShortDateString() + " ).");
