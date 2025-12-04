using CalendarBackend.Service;
using Microsoft.AspNetCore.Mvc;

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
    public IActionResult Update(UpdateAttendanceDto dto)
    {
        _attendanceService.UpdateAttendance(dto.UserId, dto.RoomId);
        return Ok();
    }

    // end attendance
    [HttpPost("end")]
    public IActionResult End(UserDto dto)
    {
        _attendanceService.EndAttendance(dto.UserId);
        return Ok();
    }

    // get today's attendance
    [HttpGet("today/{userId}")]
    public IActionResult GetToday(int userId)
    {
        var attendance = _attendanceService.GetTodayAttendance(userId);
        if (attendance == null) return NotFound();

        return Ok(attendance);
    }
}

// DTOs is only used to send data from the backend to the frontend can als be frontend to backend
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
