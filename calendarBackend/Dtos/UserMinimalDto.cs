namespace MyBackend.Dtos;

public class UserMinimalDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Role { get; set; }

    public bool AcceptedInvite { get; set; }
}