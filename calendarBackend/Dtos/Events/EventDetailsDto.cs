using CalendarBackend.Model;

namespace MyBackend.Dtos;

public class EventDetailsDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; } = "";
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int OrganizerId { get; set; }
    public bool IsOpen { get; set; }
    public RoomMinimalDto RoomMinimal { get; set; }
    public List<UserMinimalDto> Attendees { get; set; }

    public EventDetailsDto(Event eventData)
    {
        Id = eventData.Id;
        Title = eventData.Title;
        Description = eventData.Description;
        StartDate = eventData.StartDate;
        EndDate = eventData.EndDate;
        OrganizerId = eventData.OrganizerId;
        IsOpen = eventData.IsOpen;
        RoomMinimal = new RoomMinimalDto(eventData.Room);
        Attendees = eventData.Attendees
            .Select(u => new UserMinimalDto(u))
            .ToList();
    }
}