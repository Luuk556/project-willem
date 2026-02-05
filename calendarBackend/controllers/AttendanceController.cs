using System.Security.Claims;
using CalendarBackend.Service;
using Microsoft.AspNetCore.Mvc;
using MyBackend.Dtos;

namespace CalendarBackend.Controllers;

[ApiController]
[Route("attendance")]
public class AttendanceController : ControllerBase
{
    private readonly AttendanceService _attendanceService;

    public AttendanceController(AttendanceService attendanceService)
    {
        _attendanceService = attendanceService;
    }

    // add attendance
    [HttpPost]
    public IActionResult Add(AddAttendanceDto dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        _attendanceService.AddAttendance(userId, dto.RoomId);
        return Ok();
    }

    // update attendance
    [HttpPut]
    public IActionResult Update([FromBody]AddAttendanceDto dto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        _attendanceService.UpdateAttendance(userId, dto.RoomId);
        return Ok();
    }

    // end attendance
    [HttpPost("end")]
    public IActionResult End()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        _attendanceService.EndAttendance(userId);
        return Ok();
    }

    // get today's attendance
    [HttpGet("today")]
    public IActionResult GetToday()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        var attendance = _attendanceService.GetTodayAttendance(userId);
        if (attendance == null) return Ok(null);
        return Ok(attendance);
    }

    // get active users in a room
    [HttpGet("/api/rooms/{roomId}/active-users")]
    public IActionResult GetActiveUsers(int roomId)
    {
        var users = _attendanceService.GetActiveUsersInRoom(roomId);
        return Ok(users.Select(u => new { userId = u.Id, name = u.Name }));
    }

    // check if user is present in room
    [HttpGet("is-present/{roomId}")]
    public IActionResult IsUserPresentInRoom(int roomId)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        var isPresent = _attendanceService.IsUserPresentInRoom(userId, roomId);
        return Ok(new { isPresent });
    }
}