using CalendarBackend.Data;
using CalendarBackend.Model;
using Microsoft.EntityFrameworkCore;
using Isopoh.Cryptography.Argon2;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace CalendarBackend.Service;

public class UserService
{
    private readonly AppDbContext _context;
    private readonly string _jwtSecret;
    private readonly int _jwtExpiryHours;

    public UserService(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _jwtSecret = config["Jwt:Secret"];
        _jwtExpiryHours = int.Parse(config["Jwt:ExpiryHours"] ?? "2");
    }

    public async Task<bool> EmailExistsAsync(string email) =>
        await _context.Users.AnyAsync(u => u.Email == email);

    public async Task<User> CreateUserAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> GetByEmailAsync(string email) =>
        await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

    public async Task<User> GetByIdAsync(int id) =>
        await _context.Users.FindAsync(id);

    public async Task UpdateUserAsync(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public string HashPassword(string password) => Argon2.Hash(password);

    //public bool VerifyPassword(string hash, string password) => Argon2.Verify(hash, password);
    public bool VerifyPassword(string hash, string password) => hash == password;

    public string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtSecret);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(_jwtExpiryHours),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
