import { useState } from "react";
import CalendarEvent from "./calendarEvent.tsx";
import PopupComponent from "../popup/popup.tsx";

//An interface that contains the data required for a preview of an event on the calendar
interface EventPreview {
    eventName: string;
    duration: number;
    eventDate: Date;
    eventID: number;
}

//An interface that contains the settings of the calendar
interface CalendarSettings {
    selectedDate: Date;
    dateAmount: number;
    isCompact: boolean;
}

/**
 *  A calendar that shows events for specified dates
 * @param selectedDate the first date of the calendar
 * @param dateAmount the amount of days that are shown on the calendar
 * @param isCompact wether the calendar should be shown at half size 
 */
const Calendar: React.FC<CalendarSettings> = ({
    selectedDate = new Date(Date.now()),
    dateAmount = 5,
    isCompact = false
}) => {
    const dateArray = new Array<Date>;
    const [selectedEvent, setSelectedEvent] = useState(-1)
    const [openEventPopup, setOpenEventPopup] = useState(false)


    //gets the start date given to the calendar, and adds dates based on the amount of days shown
    for (let i = 0; i < dateAmount; i++) {
        let date: Date = new Date(Date.now());
        date.setDate(selectedDate.getDate() + i)
        dateArray.push(date);
    }

    //Creates an array that contains the numbers 0 - 24 that represent the hours of the day
    const timeArray = new Array<number>()
    for (let i = 0; i < 24; i++) {
        timeArray.push(i);
    }

    //Gets the name of the current day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
    function getDayName(dayIndex: number) {
        return days[dayIndex];
    }

    //temporary list. will be removed when there is a backend.
    const eventList: EventPreview[] = new Array<EventPreview>(
        {
            eventName: "Daily standup",
            duration: 30,
            eventDate: new Date(2025, 8, 29, 11),
            eventID: 1,
        },
        {
            eventName: "P.O. meeting",
            duration: 60,
            eventDate: new Date(2025, 8, 29, 15),
            eventID: 2,
        },
        {
            eventName: "Daily standup",
            duration: 30,
            eventDate: new Date(2025, 8, 30, 11),
            eventID: 3,
        },
        {
            eventName: "Lunch",
            duration: 45,
            eventDate: new Date(2025, 8, 30, 12, 30),
            eventID: 4,
        });

    function getEvent(date: Date, time: number) {
        let events = new Array<EventPreview>
        for (const eventEntry of eventList) {
            const eventDate = eventEntry.eventDate;
            if (
                eventDate.getFullYear() === date.getFullYear() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getDate() === date.getDate()
            ) {
                if (eventDate.getHours() >= time && eventDate.getHours() < time + 1) {
                    events.push(eventEntry);
                }

            }
        }
        return events;
    }

    return (
        <div className="calendar">
            <table cellSpacing={0} className="calendar-table">
                <thead className="calendar-table-head">
                    <tr className="calendar-table-row">
                        <td className="calendar-table-cell"> </td>
                        {
                            dateArray.map((date) => (
                                <th key={date.toISOString()} className="calendar-table-cell">{getDayName(date.getDay())} {date.getMonth()} / {date.getDate()}</th>
                            ))
                        }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        timeArray.map((time) => (
                            <tr className="calendar-table-row" key={time}>
                                <td className="calendar-table-cell">{time + ":00"}</td>
                                {
                                    dateArray.map((date, dateIndex) => {
                                        const events = getEvent(date, time)
                                        return (
                                            <td className="calendar-table-cell" style={{ height: isCompact ? "40px" : "80px" }} key={dateIndex}>
                                                <div className="calendar-table-cell-half"></div>
                                                {
                                                    events.map((eventData) => (
                                                        <button
                                                            key={eventData.eventID}
                                                            style={{ height: eventData.duration / 60 * 100 + "%", top: eventData.eventDate.getMinutes() / 60 * 100 + "%" }}
                                                            className="calendar-event-button"
                                                            onClick={() => { setSelectedEvent(eventData.eventID); setOpenEventPopup(true) }}
                                                        >{eventData.eventName}</button>
                                                    ))
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <PopupComponent
                closePopup={() => setOpenEventPopup(false)}
                isOpen={openEventPopup}
            >
                <CalendarEvent eventID={selectedEvent} />
            </PopupComponent>
        </div>
    )
}
export default Calendar;