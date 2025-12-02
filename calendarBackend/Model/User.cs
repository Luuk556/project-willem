namespace CalendarBackend.Model;

public enum Role {
    User = 0,
    Admin = 1,
}
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Biography { get; set; }
    public Role Role { get; set; }
    public Byte[]? ProfilePicture { get; set; }
}