using CalendarBackend.Model;
using MyBackend.Enums;

namespace MyBackend.Dtos;


public class UserMinimalDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Role Role { get; set; }

    public bool AcceptedInvite { get; set; }

    public UserMinimalDto(User user)
    {
        Id = user.Id;
        Name = user.Name;
        Role = user.Role;
    }
}