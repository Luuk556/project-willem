using CalendarBackend.Model;

namespace MyBackend.Dtos;

public class EventPreviewDto
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsOpen { get; set; }

    public EventPreviewDto(Event eventData)
    {
        Id = eventData.Id;
        Title = eventData.Title;
        StartDate = eventData.StartDate;
        EndDate = eventData.EndDate;
        IsOpen = eventData.IsOpen;
    }
}