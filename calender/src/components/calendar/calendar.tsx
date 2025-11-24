import { useState } from "react";
import CalendarEvent from "./calendarEvent.tsx";
import PopupComponent from "../popup/popup.tsx";
import { EventPreview } from "../../data/datatypes/eventDatatypes.ts";
import EventList from "../../data/EventService.ts"


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
    isCompact = false,
}) => {
    const dateArray = new Array<Date>;
    const [selectedEvent, setSelectedEvent] = useState(-1)
    const [openEventPopup, setOpenEventPopup] = useState(false)

    const eventList = EventList

    //gets the start date given to the calendar, and adds dates based on the amount of days shown
    for (let i = 0; i < dateAmount; i++) {
        let date: Date = new Date(selectedDate);
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


    // Turns the date of an event int a key for a map
    function getDateKey(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }

    // a map with the date of an event as the key. the second map has the time of the event as the key.
    // this map stores when an event is to take place.
    let eventMap: Map<string, Map<number, EventPreview[]>> = new Map()
    dateArray.forEach(date => {
        const hourMap: Map<number, EventPreview[]> = new Map();
        const events = eventList.getEventPreviewByDate(date);
        events.forEach(event => {
            const hour = event.startDate.getHours();
            if (!hourMap.has(hour)) {
                hourMap.set(hour, []);
            }
            hourMap.get(hour)!.push(event);
        })

        if (hourMap.size > 0) {
            eventMap.set(getDateKey(date), hourMap);
        }
    });

    const displayCell = (date: Date, time: number) => {
        const hourMap = eventMap.get(getDateKey(date));
        const events: EventPreview[] = hourMap?.get(time) ?? [];

        return (
            <td className="calendar-table-cell" style={{ height: isCompact ? "40px" : "80px" }}>
                <div className="calendar-table-cell-half"></div>
                <div className="calendar-cell-content">
                    {
                        events.map((eventData) => (
                            <div onClick={() => { setSelectedEvent(eventData.eventID); setOpenEventPopup(true) }}>
                                <EventButton data={eventData} />
                            </div>
                        ))
                    }
                </div>
            </td>
        )
    }

    return (
        <div className="calendar">
            <table cellSpacing={0} className="calendar-table">
                <thead className="calendar-table-head">
                    <tr className="calendar-table-row">
                        <th className="calendar-table-cell"> </th>
                        {
                            dateArray.map((date) => (
                                <th key={date.toISOString()} className="calendar-table-cell">{getDayName(date.getDay())} {date.getMonth()} / {date.getDate()}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        timeArray.map((time) => (
                            <tr className="calendar-table-row" key={time}>
                                <td className="calendar-table-cell">{time + ":00"}</td>
                                {
                                    dateArray.map((date) => (
                                        displayCell(date, time)
                                    ))
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