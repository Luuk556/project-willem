using CalendarBackend.Service;
using Microsoft.AspNetCore.Mvc;
using MyBackend.Dtos;

namespace CalendarBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
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
        _attendanceService.AddAttendance(dto.UserId, dto.RoomId);
        return Ok();
    }

    // update attendance
    [HttpPut]
    public IActionResult Update([FromBody]AddAttendanceDto dto)
    {
        _attendanceService.UpdateAttendance(dto.UserId, dto.RoomId);
        return Ok();
    }

    // end attendance
    [HttpPost("end")]
    public IActionResult End(int userId)
    {
        _attendanceService.EndAttendance(userId);
        return Ok();
    }

    // get today's attendance
    [HttpGet("today/{userId}")]
    public IActionResult GetToday(int userId)
    {
        var attendance = _attendanceService.GetTodayAttendance(userId);
        if (attendance == null) return NotFound(new { success = false, message = "No data records" });
        return Ok(new { success = true, attendance });
    }

    // get active users in a room
    [HttpGet("/api/rooms/{roomId}/active-users")]
    public IActionResult GetActiveUsers(int roomId)
    {
        var users = _attendanceService.GetActiveUsersInRoom(roomId);
        return Ok(users.Select(u => new { userId = u.Id, name = u.Name }));
    }
}