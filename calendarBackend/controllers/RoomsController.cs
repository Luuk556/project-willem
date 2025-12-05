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
    public Room GetRooms([FromQuery]int roomId)
    {
        return _roomService.GetById(roomId);
    }

    // GET: api/Rooms/5
    [HttpGet("{id}")] public async Task<ActionResult<Room>> GetRoom(int id)
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
        
        RoomMapDto[] rooms = _roomService.GetAllRoomsForMap(date);

        return Ok(rooms);
    }
    // PUT: api/Rooms/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")] public async Task<IActionResult> PutRoom(int id, Room room)
    {
        if (id != room.Id)
        {
            return BadRequest();
        }

        _context.Entry(room).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RoomExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Rooms
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost] public async Task<ActionResult<Room>> PostRoom(Room room)
    {
        _context.Rooms.Add(room);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetRoom", new { id = room.Id }, room);
    }

    // DELETE: api/Rooms/5
    [HttpDelete("{id}")] public async Task<IActionResult> DeleteRoom(int id)
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

