import { EventDetails } from "../../data/datatypes/eventDatatypes.ts";
import EventList from "../../data/EventData.ts"
import RoomList from "../../data/RoomData.ts"
interface CalendarEventProperties {
    eventID: number;
}

/**
 * A popup that displays the details of an event.
 * @param eventID The id of an event 
 */
const CalendarEvent: React.FC<CalendarEventProperties> = ({ eventID = -1 }) => {

    const eventList = EventList
    const roomList = RoomList

    //Gets the name of the current day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function getMinute(inputDate: Date): number {
        return inputDate.getMinutes() + inputDate.getHours() * 60
    }

    //Temporary list. Will be removed when there is a backend.
    const users = ["Piet", "Klaas", "Jan", "Kees", "johan", "Pieter"]

    const eventDetails: EventDetails = eventList.getEventById(eventID);
    const date: string = `${days[eventDetails.startDate.getDay()]} ${eventDetails.startDate.getDate()} ${months[eventDetails.startDate.getMonth()]}`;
    const eventDuration: string = `${eventDetails.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${eventDetails.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${getMinute(eventDetails.endDate) - getMinute(eventDetails.startDate)} minutes)`;
    const room: string = roomList.getRoomById(eventDetails.roomID).toString();

    function getTimeUntilEvent(): string {
        const currentDate: Date = new Date(Date.now());
        if (currentDate > eventDetails.startDate && currentDate < eventDetails.endDate) {
            return "Event ongoing";
        }
        if (currentDate < eventDetails.startDate && currentDate.getDate() == eventDetails.startDate.getDate()) {
            let totalMinutes = getMinute(eventDetails.startDate) - getMinute(currentDate);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return   "starts in " + (hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""} and ` : "") + `${minutes} minute${minutes === 1 ? "" : "s"}`;
        }
        return "";
    };

    function getJoinEvent() {
        if (eventDetails.isOpenEvent) return <button>Join event</button>
    }    

    return (
        <div className="event-container">
            <div className="left-panel">
                <div className="left-top">
                    <p className="title">{eventDetails.title}</p>
                    <p>{eventDetails.description}</p>
                </div>
                <div className="left-bottom">
                    <div className="date-information">
                        <p>{date}</p>
                        <p>{eventDuration}</p>
                        <p>{getTimeUntilEvent()}</p>
                    </div>
                    <div className="room-information">
                        <p>In {room}</p>
                        {getJoinEvent()}
                    </div>
                </div>
            </div>
            <div className="right-panel">
                other people in this meeting:
                {
                    eventDetails.userList.map((userID) => {
                        return <button key={userID}>{users[userID]}</button>
                    })
                }
            </div>
        </div>
    )
}

export default CalendarEvent;