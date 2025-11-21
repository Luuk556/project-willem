namespace calendarBackend.Models
{
    public class EventAttendee
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }
    }
}