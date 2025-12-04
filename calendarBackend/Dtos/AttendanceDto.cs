namespace MyBackend.Dtos;
public class AddAttendanceDto
{
    public int UserId { get; set; }
    public int RoomId { get; set; }
}

public class UpdateAttendanceDto
{
    public int UserId { get; set; }
    public int RoomId { get; set; }
}

public class UserDto
{
    public int UserId { get; set; }
}