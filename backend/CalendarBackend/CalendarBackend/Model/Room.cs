namespace CalendarBackend.Model;

public class Room
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int SizeX { get; set; }
    public int SizeY { get; set; }
    public int PositionX { get; set; }
    public int PositionY { get; set; }
}