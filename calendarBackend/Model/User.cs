using MyBackend.Enums;

namespace CalendarBackend.Model;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Biography { get; set; }
    public Role Role { get; set; }
    public Byte[]? ProfilePicture { get; set; }
    
    public ICollection<Event> OrganizedEvents { get; set; }
    
    public ICollection<Event> Events { get; set; }

    public ICollection<Attendance> Attendances { get; set; }
}