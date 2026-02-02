using CalendarBackend.Model;

namespace MyBackend.Dtos;

public class RoomMinimalDto
{
    public int Id { get; set; }
    public string Name { get; set; }

    public RoomMinimalDto(Room room)
    {
        Id = room.Id;
        Name = room.Name;
    }
}