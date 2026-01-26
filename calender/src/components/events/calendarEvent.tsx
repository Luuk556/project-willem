import axios from "axios";
import { EventDto } from "../../data/datatypes/eventDatatypes.ts";
import { useEffect, useState } from "react";
interface CalendarEventProperties {
    eventID: number;
}

/**
 * A popup that displays the details of an event.
 * @param eventID The id of an event 
 */
const CalendarEvent: React.FC<CalendarEventProperties> = ({ eventID = -1 }) => {
    const token = localStorage.getItem("token");
    const [hasAttendance, setHasAttendance] = useState<Boolean | null>(null)
    const [eventDetails, setEventDetails] = useState<EventDto>({
        id: eventID,
        title: "Fetching event data",
        description: "",
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now()),
        isOpen: false,
        organizerId: -1,
        roomMinimal: {
            id: -1,
            name: ""
        },
        attendees: []
    });


    //Gets the name of the current day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function getMinute(inputDate: Date): number {
        return inputDate.getMinutes() + inputDate.getHours() * 60
    }

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get<EventDto>(
                    "http://localhost:5184/event/details",
                    {
                        params: {
                            eventId: eventID
                        }
                    }
                );

                const newEvent = response.data;
                newEvent.startDate = new Date(newEvent.startDate);
                newEvent.endDate = new Date(newEvent.endDate);

                setEventDetails(newEvent);
            } catch (err) {
                console.error("Failed to fetch event:", err);

                const errorPlaceholderEvent: EventDto = {
                    id: -1,
                    title: "No event found",
                    description: "",
                    startDate: new Date(Date.now()),
                    endDate: new Date(Date.now()),
                    isOpen: false,
                    organizerId: -1,
                    roomMinimal: {
                        id: -1,
                        name: "No room found"
                    },
                    attendees: []
                }

                setEventDetails(errorPlaceholderEvent)
            }
        };

        fetchEventDetails();
    }, [eventID]);

    useEffect(() => {
        const fetchHasAttendance = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5184/event-attendance/get",
                    {
                        params: {
                            eventId: eventID
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response)
                const result: boolean = response.data != "";
                setHasAttendance(result)

            } catch (err) {
                console.error("Failed to fetch event attendance:", err);
            }
        }
        if (eventDetails.isOpen) {
            fetchHasAttendance()
        }

    }, [eventDetails])

    const joinEvent = async () => {
        if (hasAttendance) {
            console.error("Failed to join event. User already has attendance.");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5184/event-attendance/add",
                null, {
                params: {
                    eventId: eventID
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            )
            const status = response.status;
            if (status == 200) {
                setHasAttendance(true);
            }
        } catch (err) {
            console.error("Failed to join event:", err);
        }

    }

    const leaveEvent = async () => {
        if (!hasAttendance) {
            console.error("Failed to leave event. User has no attendance.");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5184/event-attendance/leave",
                null, {
                params: {
                    eventId: eventID
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            )
            const status = response.status;
            if (status == 200) {
                setHasAttendance(false);
            }
        } catch (err) {
            console.error("Failed to leave event:", err);
        }
    }

    const date: string = `${days[eventDetails.startDate.getDay()]} ${eventDetails.startDate.getDate()} ${months[eventDetails.startDate.getMonth()]}`;
    const eventDuration: string = `${eventDetails.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${eventDetails.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${getMinute(eventDetails.endDate) - getMinute(eventDetails.startDate)} minutes)`;

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
        if (eventDetails.isOpen) return hasAttendance ? <button onClick={leaveEvent}>Leave event</button> : <button onClick={joinEvent}>Join event</button>
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
                        <p>In {eventDetails.roomMinimal.name}</p>
                        {getJoinEvent()}
                    </div>
                </div>
            </div>
            <div className="right-panel">
                other people in this meeting:
                <div className="event-other-people">
                    {
                        eventDetails.attendees.map((user) => {
                            return <p key={user.id}>{user.name}</p>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CalendarEvent;