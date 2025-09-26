interface CalendarEventProperties {
    eventID: number;
}

interface EventDetails {
    ID: number;
    title: string;
    description: string;
    startDate: Date;
    duration: number;
    roomID: number;
    isOpenEvent: boolean;
}

/**
 * A popup that displays the details of an event.
 * @param eventID The id of an event 
 */
const CalendarEvent: React.FC<CalendarEventProperties> = ({ eventID = -1 }) => {
    //Temporary list of events. will be removed once there is a backend. 
    const eventDetailList: EventDetails[] = new Array<EventDetails>(
        {
            ID: 1,
            title: "Daily standup",
            description: "Daily standup description",
            startDate: new Date(2025, 8, 26, 11),
            duration: 30,
            roomID: 1,
            isOpenEvent: false
        },
        {
            ID: 2,
            title: "P.O. meeting",
            description: "Call with product owner",
            startDate: new Date(2025, 8, 26, 15),
            duration: 60,
            roomID: 1,
            isOpenEvent: false
        },
        {
            ID: 3,
            title: "Daily standup",
            description: "Daily standup description",
            startDate: new Date(2025, 8, 27, 11),
            duration: 15,
            roomID: 1,
            isOpenEvent: false
        },
        {
            ID: 4,
            title: "Lunch",
            description: "Lunch in canteen",
            startDate: new Date(2025, 8, 27, 11, 15),
            duration: 45,
            roomID: 0,
            isOpenEvent: true
        }
    )

    const getEventDetails = (eventID: number): EventDetails => {
        console.log(eventID)
        let result: EventDetails = {
            ID: 0,
            title: "Could not find event details",
            description: "",
            startDate: new Date(Date.now()),
            duration: 0,
            roomID: 0,
            isOpenEvent: false
        }
        for (let i = 0; i < eventDetailList.length; i++) {
            if (eventID === eventDetailList[i].ID) {
                result = eventDetailList[i];
                break;
            }
        }

        return result;
    }
    return (
        <div className="event-container">
            {
                (() => {
                    const eventDetails: EventDetails = getEventDetails(eventID);
                    return (
                        <div>
                            <p>ID: {eventDetails.ID}</p>
                            <p>Title: {eventDetails.title}</p>
                            <p>Description: {eventDetails.description}</p>
                            <p>Start Date: {eventDetails.startDate.toString()}</p>
                            <p>Duration: {eventDetails.duration} minutes</p>
                            <p>Room ID: {eventDetails.roomID}</p>
                            <p>Open Event: {eventDetails.isOpenEvent ? "Yes" : "No"}</p>
                        </div>
                    );
                })()
            }
        </div>
    )
}

export default CalendarEvent;