namespace MyBackend.Dtos;

public class EventPreviewDto
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}