using System;

namespace CalendarBackend.Dtos
{
    public class CreateEventDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int RoomId { get; set; }
        public string StartDate { get; set; } // e.g. "2026-01-01"
        public string StartTime { get; set; } // e.g. "10:00"
        public string EndDate { get; set; }   // e.g. "2026-01-01"
        public string EndTime { get; set; }   // e.g. "11:00"
    }
}
