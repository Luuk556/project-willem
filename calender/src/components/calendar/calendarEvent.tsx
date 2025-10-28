interface CalendarEventProperties {
    eventID: number;
    closePopup: () => void;
}

/**
 * A popup that displays the details of an event.
 * @param eventID The id of an event 
 */
const CalendarEvent: React.FC<CalendarEventProperties> = ({ eventID = -1, closePopup }) => {
    return (
        <div className="event-container">
            <button
                onClick={closePopup}
                className="close-button">X</button>
        </div>
    )
}

export default CalendarEvent;