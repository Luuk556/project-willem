// See https://aka.ms/new-console-template for more information

using CalendarBackend.Data;
using CalendarBackend.Model;
using CalendarBackend.Service;

Console.WriteLine("Hello, World!");

AppDbContext context = new AppDbContext();
UserRepository userRepository = new UserRepository(context);

User user = new User
{
    Name = "John",
    Email = "John@gmail.com",
    Password = "password",
    Biography = "biography",
    Role = Role.User,
    ProfilePicture = null
};

userRepository.Create(user);
Console.WriteLine(user.Id);

User? testUser = userRepository.Get(1);
if (testUser != null)
{
    Console.WriteLine(testUser.Name);
}




