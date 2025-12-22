import { useEffect, useState } from "react";
import CalendarEvent from "../events/calendarEvent.tsx";
import PopupComponent from "../popup/popup.tsx";
import { EventPreview } from "../../data/datatypes/eventDatatypes.ts";
import EventButton from "./EventButton.tsx";
import axios from "axios";


//An interface that contains the settings of the calendar
interface CalendarSettings {
    selectedDate: Date;
    dateAmount: number;
    isCompact: boolean;
    onlyOpenEvents: boolean | null;
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
    onlyOpenEvents = false
}) => {
    const [selectedEvent, setSelectedEvent] = useState(-1)
    const [openEventPopup, setOpenEventPopup] = useState(false)
    const [eventMap, setEventMap] = useState<Map<string, Map<number, EventPreview[]>>>(new Map());

    //gets the start date given to the calendar, and adds dates based on the amount of days shown
    const dateArray = new Array<Date>;
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


    useEffect(() => {
        const fetchAllEvents = async () => {
            const newEvents = new Map<string, Map<number, EventPreview[]>>();
            try {
                let url = onlyOpenEvents ? "http://localhost:5184/event/open" : "http://localhost:5184/event/event-previews"
                for (const date of dateArray) {
                    const response = await axios.get<EventPreview[]>(
                        url,
                        {
                            params: {
                                date: date.toISOString()
                            }
                        }
                    );

                    const events: EventPreview[] = response.data;
                    const hourMap = new Map<number, EventPreview[]>();

                    for (const event of events) {
                        event.startDate = new Date(event.startDate);
                        event.endDate = new Date(event.endDate);
                        const hour = event.startDate.getHours();
                        if (!hourMap.has(hour)) {
                            hourMap.set(hour, []);
                        }
                        hourMap.get(hour)!.push(event);
                    }

                    if (hourMap.size > 0) {
                        newEvents.set(getDateKey(date), hourMap);
                    }
                }

                setEventMap(newEvents);
            } catch (err) {
                console.error("Failed to fetch events:", err);
                setEventMap(new Map());
            }
        };

        fetchAllEvents();
    }, [selectedDate, dateAmount]);

    const displayCell = (date: Date, time: number) => {
        const hourMap = eventMap.get(getDateKey(date));
        const events: EventPreview[] = hourMap?.get(time) ?? [];

        return (
            <td className="calendar-table-cell" style={{ height: isCompact ? "40px" : "80px" }}>
                <div className="calendar-table-cell-half"></div>
                <div className="calendar-cell-content">
                    {
                        events.map((eventData) => (
                            <div onClick={() => { setSelectedEvent(eventData.id); setOpenEventPopup(true) }}>
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