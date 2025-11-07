import { EventDetails, EventPreview } from "./datatypes/eventDatatypes"
// a temporary file containing a list of all events

class EventList {
    eventList: EventDetails[] = [{
        ID: 0,
        title: "Daily standup",
        description: "Long daily standup description so i can test how it would look if the description of this event is long.",
        startDate: new Date(2025, 9, 3, 11),
        endDate: new Date(2025, 9, 3, 11, 30),
        roomID: 9,
        isOpenEvent: false,
        userList: [0, 1, 2]
    },
    {
        ID: 1,
        title: "P.O. meeting",
        description: "Call with product owner",
        startDate: new Date(2025, 9, 3, 15),
        endDate: new Date(2025, 9, 3, 45),
        roomID: 8,
        isOpenEvent: false,
        userList: [3, 4, 5]
    },
    {
        ID: 2,
        title: "P.O. meeting part 2",
        description: "Call with product owner",
        startDate: new Date(2025, 9, 3, 15, 30),
        endDate: new Date(2025, 9, 3, 16, 30),
        roomID: 8,
        isOpenEvent: false,
        userList: [3, 4, 5]
    },
    {
        ID: 3,
        title: "P.O. meeting part 3",
        description: "Call with product owner",
        startDate: new Date(2025, 9, 3, 16, 30),
        endDate: new Date(2025, 9, 3, 17, 30),
        roomID: 8,
        isOpenEvent: false,
        userList: [3, 4, 5]
    },
    {
        ID: 4,
        title: "Daily standup",
        description: "Daily standup description",
        startDate: new Date(2025, 9, 4, 11),
        endDate: new Date(2025, 9, 4, 11, 30),
        roomID: 9,
        isOpenEvent: false,
        userList: []
    },
    {
        ID: 5,
        title: "Lunch",
        description: "Lunch in canteen",
        startDate: new Date(2025, 9, 4, 12, 30),
        endDate: new Date(2025, 9, 4, 13, 15),
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
            endDate: new Date(Date.now()),
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
        const targetDate: Date = new Date(date)
        targetDate.setHours(time)
        for (const event of this.eventList) {
            if (event.startDate > targetDate && event.endDate < targetDate) {
                events.push({
                    eventName: event.title,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    eventID: event.ID
                });
            }
        }
        return events;
    }

    getEventsByRoom(roomID: number): Array<EventDetails> {
        let events: Array<EventDetails> = []
        for (const event of this.eventList) {
            events.push(event)
        }
        return events
    }

}

export default new EventList();