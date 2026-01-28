using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CalendarBackend.Data;
using CalendarBackend.Model;
using CalendarBackend.Service;
using MyBackend.Dtos;
using CalendarBackend.Dtos;

namespace MyBackend.Controllers;
    [Route("room")]
    [ApiController]
    
    public class RoomsController : Controller
{
    private readonly AppDbContext _context;
    private RoomService _roomService;

    public RoomsController(AppDbContext context)
    {
        _context = context;
        _roomService = new RoomService(_context);
    }

    // GET: api/Rooms
    [HttpGet("GetById")]
    public IActionResult GetRooms([FromQuery]int roomId)
    {
        RoomDto result = _roomService.GetById(roomId);
        return Ok(result);
    }

    // GET: api/Rooms/5
    [HttpGet("{id}")] 
    public async Task<ActionResult<Room>> GetRoom(int id)
    {
        var room = await _context.Rooms.FindAsync(id);

        if (room == null)
        {
            return NotFound();
        }

        return room;
    }
    
    // GET: /room/all to get all rooms
    [HttpGet("all")]
    public IActionResult GetAllRooms()
    {
        var rooms = _roomService.GetAllRoomMinimal();

        return Ok(rooms);
    }
    
    [HttpGet("all-full")]
    public IActionResult GetAllRoomsFull()
    {
        var rooms = _roomService.GetAll();

        return Ok(rooms);
    }
    
    [HttpGet("map")]
    public IActionResult GetAllRoomsForMap([FromQuery]DateTime date)
    {
        
        RoomDto[] rooms = _roomService.GetAllRoomsForMap(date);

        return Ok(rooms);
    }

    // POST: api/Rooms
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost] 
    public async Task<ActionResult<Room>> PostRoom(Room room)
    {
        _context.Rooms.Add(room);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetRoom", new { id = room.Id }, room);
    }

        // PUT: room/edit/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutRoom(int id, [FromBody] UpdateRoomDto room)
        {
            if (id != room.Id)
            {
                return BadRequest();
            }

            var affected = await _context.Rooms
                .Where(r => r.Id == id)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(r => r.Name, room.Name)
                    .SetProperty(r => r.Capacity, room.Capacity)
                    .SetProperty(r => r.SizeX, room.SizeX)
                    .SetProperty(r => r.SizeY, room.SizeY)
                    .SetProperty(r => r.PositionX, room.PositionX)
                    .SetProperty(r => r.PositionY, room.PositionY)
                );

            if (affected == 0)
                return NotFound();

            return NoContent();
        }

    // DELETE: api/Rooms/5
    [HttpDelete("{id}")] 
    public async Task<IActionResult> DeleteRoom(int id)
    {
        var room = await _context.Rooms.FindAsync(id);
        if (room == null)
        {
            return NotFound();
        }
        _context.Rooms.Remove(room);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool RoomExists(int id)
    {
        return _context.Rooms.Any(e => e.Id == id);
    }
}

