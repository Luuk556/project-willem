import { EventDto } from "../../data/datatypes/eventDatatypes.ts";
import { useEffect, useState } from "react";
import { getEventDetails } from "../../services/eventService.ts";
import { addAttendance, getEventAttendance, leaveEvent } from "../../services/eventAttendanceService.ts";
interface CalendarEventProperties {
    eventID: number;
}

/**
 * A popup that displays the details of an event.
 * @param eventID The id of an event 
 */
const CalendarEvent: React.FC<CalendarEventProperties> = ({ eventID = -1 }) => {
    const [hasAttendance, setHasAttendance] = useState<boolean | null>(null)
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
                const response = await getEventDetails(eventID)

                response.startDate = new Date(response.startDate);
                response.endDate = new Date(response.endDate);

                setEventDetails(response);
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
                const result: boolean = await getEventAttendance(eventID) != "";
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
            addAttendance(eventID)
            setHasAttendance(true);

        } catch (err) {
            console.error("Failed to join event:", err);
        }

    }

    const fetchLeaveEvent = async () => {
        if (!hasAttendance) {
            console.error("Failed to leave event. User has no attendance.");
            return;
        }
        try {
            leaveEvent(eventID)

            setHasAttendance(false);
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
        if (eventDetails.isOpen) return hasAttendance ? <button onClick={fetchLeaveEvent}>Leave event</button> : <button onClick={joinEvent}>Join event</button>
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