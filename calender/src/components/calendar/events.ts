import { EventDetails, EventPreview } from "./eventDatatypes"
// a temporary file containing a list of all events

class EventList {
    eventList: EventDetails[] = [{
        ID: 1,
        title: "Daily standup",
        description: "Long daily standup description so i can test how it would look if the description of this event is long.",
        startDate: new Date(2025, 9, 3, 11),
        duration: 30,
        roomID: 1,
        isOpenEvent: false,
        userList: [0, 1, 2]
    },
    {
        ID: 2,
        title: "P.O. meeting",
        description: "Call with product owner",
        startDate: new Date(2025, 9, 3, 15),
        duration: 30,
        roomID: 1,
        isOpenEvent: false,
        userList: [3, 4, 5]
    },
    {
        ID: 3,
        title: "P.O. meeting part 2",
        description: "Call with product owner",
        startDate: new Date(2025, 9, 3, 15, 30),
        duration: 60,
        roomID: 1,
        isOpenEvent: false,
        userList: [3, 4, 5]
    },
    {
        ID: 4,
        title: "P.O. meeting part 3",
        description: "Call with product owner",
        startDate: new Date(2025, 9, 3, 16, 30),
        duration: 60,
        roomID: 1,
        isOpenEvent: false,
        userList: [3, 4, 5]
    },
    {
        ID: 5,
        title: "Daily standup",
        description: "Daily standup description",
        startDate: new Date(2025, 9, 4, 11),
        duration: 30,
        roomID: 1,
        isOpenEvent: false,
        userList: []
    },
    {
        ID: 6,
        title: "Lunch",
        description: "Lunch in canteen",
        startDate: new Date(2025, 9, 4, 12, 30),
        duration: 45,
        roomID: 0,
        isOpenEvent: true,
        userList: []
    }];

    getEventById(ID: number): EventDetails {
        let result: EventDetails = {
            ID: 0,
            title: "Could not find event details",
            description: "",
            startDate: new Date(Date.now()),
            duration: 0,
            roomID: 0,
            isOpenEvent: false,
            userList: []
        };
        for (let i = 0; i < this.eventList.length; i++) {
            if (ID === this.eventList[i].ID) {
                result = this.eventList[i];
                break;
            }
        }
        return result;
    }

    getEventPreview(date: Date, time: number) {
        let events = new Array<EventPreview>
        for (const event of this.eventList) {
            const eventDate = event.startDate;
            if (
                eventDate.getFullYear() === date.getFullYear() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getDate() === date.getDate()
            ) {
                if (eventDate.getHours() >= time && eventDate.getHours() < time + 1) {
                    events.push({
                        eventName: event.title,
                        duration: event.duration,
                        eventDate: event.startDate,
                        eventID: event.ID
                    }
                    );
                }
            }
        }
        return events;
    }

}

export default new EventList();