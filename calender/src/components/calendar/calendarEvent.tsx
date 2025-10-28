import { EventDetails } from "./eventDatatypes";
import EventList from "./events.ts"
interface CalendarEventProperties {
    eventID: number;
}

/**
 * A popup that displays the details of an event.
 * @param eventID The id of an event 
 */
const CalendarEvent: React.FC<CalendarEventProperties> = ({ eventID = -1 }) => {

    const eventList = EventList

    //Gets the name of the current day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function getMinute(inputDate: Date): number {
        return inputDate.getMinutes() + inputDate.getHours() * 60
    }

    //Temporary lists. Will be removed when there is a backend.
    const users = ["Piet", "Klaas", "Jan", "Kees", "johan", "Pieter"]
    const rooms = ["Canteen", "Room 1"]

    return (
        <div className="event-container">
            {
                (() => {
                    const eventDetails: EventDetails = eventList.getEventById(eventID);
                    return (
                        <div>
                            <div className="left-panel">
                                <div className="left-top">
                                    <p className="title">{eventDetails.title}</p>
                                    <p>{eventDetails.description}</p>
                                </div>
                                <div className="left-bottom">
                                    <div className="date-information">
                                        <p>{days[eventDetails.startDate.getDay()]} {eventDetails.startDate.getDate()} {months[eventDetails.startDate.getMonth()]}</p>
                                        <p>{
                                            eventDetails.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                            {new Date(eventDetails.startDate.getTime() + eventDetails.duration * 60000).toLocaleTimeString(
                                                [], {
                                                hour: '2-digit', minute: '2-digit'
                                            })} ({eventDetails.duration} minutes)
                                        </p>
                                        {(() => {
                                            const currentDate: Date = new Date(Date.now());
                                            if (currentDate > eventDetails.startDate) return;

                                            let totalMinutes = getMinute(eventDetails.startDate) - getMinute(currentDate)
                                            const hours = Math.floor(totalMinutes / 60);
                                            const minutes = totalMinutes % 60;

                                            if (currentDate.getDate() == eventDetails.startDate.getDate()) {
                                                return <p>starts in {hours > 0 && `${hours} hour${hours > 1 ? "s" : ""} and`} {minutes} minute{minutes == 1 ? "" : "s"}</p>
                                            }

                                        })()}
                                    </div>
                                    <div className="room-information">
                                        <p>In {rooms[eventDetails.roomID]}</p>
                                        {(() => {
                                            if (eventDetails.isOpenEvent) return <button>Join event</button>
                                        })()}
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
                    );
                })()
            }
        </div>
    )
}

export default CalendarEvent;