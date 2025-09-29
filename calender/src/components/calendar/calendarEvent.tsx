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
    userList: number[];
}

/**
 * A popup that displays the details of an event.
 * @param eventID The id of an event 
 */
const CalendarEvent: React.FC<CalendarEventProperties> = ({ eventID = -1 }) => {

    //Gets the name of the current day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function getMinute(inputDate: Date): number {
        return inputDate.getMinutes() + inputDate.getHours() * 60
    }

    //Temporary lists. Will be removed when there is a backend.
    const users = ["Piet", "Klaas", "Jan", "Kees", "johan", "Pieter"]
    const rooms = ["Canteen", "Room 1"]
    const eventDetailList: EventDetails[] = new Array<EventDetails>(
        {
            ID: 1,
            title: "Daily standup",
            description: "Long daily standup description so i can test how it would look if the description of this event is long.",
            startDate: new Date(2025, 8, 29, 10, 30),
            duration: 30,
            roomID: 1,
            isOpenEvent: false,
            userList: [0, 1, 2]
        },
        {
            ID: 2,
            title: "P.O. meeting",
            description: "Call with product owner",
            startDate: new Date(2025, 8, 29, 15),
            duration: 60,
            roomID: 1,
            isOpenEvent: false,
            userList: [3, 4, 5]
        },
        {
            ID: 3,
            title: "Daily standup",
            description: "Daily standup description",
            startDate: new Date(2025, 8, 30, 11),
            duration: 30,
            roomID: 1,
            isOpenEvent: false,
            userList: []
        },
        {
            ID: 4,
            title: "Lunch",
            description: "Lunch in canteen",
            startDate: new Date(2025, 8, 30, 11, 15),
            duration: 45,
            roomID: 0,
            isOpenEvent: true,
            userList: []
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
            isOpenEvent: false,
            userList: []
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