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
}