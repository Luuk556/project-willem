using CalendarBackend.Model;

namespace MyBackend.Dtos;

public class RoomDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int Capacity { get; set; }
    public int SizeX { get; set; }
    public int SizeY { get; set; }
    public int PositionX { get; set; }
    public int PositionY { get; set; }
    public bool IsAvailable { get; set; }

    public RoomDto(Room room)
    {
        Id = room.Id;
        Name = room.Name;
        Capacity = room.Capacity;
        SizeX = room.SizeX;
        SizeY = room.SizeY;
        PositionX = room.PositionX;
        PositionY = room.PositionY;
    }
}