import axios from "axios";
import { EventDetails } from "../../data/datatypes/eventDatatypes.ts";
import EventList from "../../data/EventService.ts"
import RoomList from "../../data/RoomData.ts"
import { useEffect, useState } from "react";
interface CalendarEventProperties {
    eventID: number;
}

/**
 * A popup that displays the details of an event.
 * @param eventID The id of an event 
 */
const CalendarEvent: React.FC<CalendarEventProperties> = ({ eventID = -1 }) => {
    const [eventDetails, setEventDetails] = useState<EventDetails>({
        ID: eventID,
        title: "Fetching event data",
        description: "",
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now()),
        roomID: -1,
        isOpen: false,
        OrganizerId: -1
    });
    const roomList = RoomList

    //Gets the name of the current day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function getMinute(inputDate: Date): number {
        return inputDate.getMinutes() + inputDate.getHours() * 60
    }

    //Temporary list. Will be removed when there is a backend.
    const users = ["Piet", "Klaas", "Jan", "Kees", "johan", "Pieter"]

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const response = await axios.get<EventDetails>(
                    "http://localhost:5000/event/details",
                    {
                        params: {
                            eventId: eventID
                        }
                    }
                );

                console.log(response.data);

                const newEvent = response.data;
                newEvent.startDate = new Date(newEvent.startDate);
                newEvent.endDate = new Date(newEvent.endDate);



                setEventDetails(newEvent);
            } catch (err) {
                console.error("Failed to fetch event:", err);
                const errorPlaceholderEvent: EventDetails = {
                    ID: -1,
                    title: "No event found",
                    description: "",
                    startDate: new Date(Date.now()),
                    endDate: new Date(Date.now()),
                    roomID: -1,
                    isOpen: false,
                    OrganizerId: -1
                }
                setEventDetails(errorPlaceholderEvent)
            }
        };

        fetchAllEvents();
    }, [eventID]);

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
            return "starts in " + (hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""} and ` : "") + `${minutes} minute${minutes === 1 ? "" : "s"}`;
        }
        return "";
    };

    function getJoinEvent() {
        if (eventDetails.isOpen) return <button>Join event</button>
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
                    //eventDetails.userList.map((userID) => {
                    //    return <button key={userID}>{users[userID]}</button>
                    //})
                }
            </div>
        </div>
    )
}

export default CalendarEvent;