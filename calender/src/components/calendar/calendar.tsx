import { useEffect, useMemo, useState } from "react";
import CalendarEvent from "../events/calendarEvent.tsx";
import PopupComponent from "../popup/popup.tsx";
import { EventPreview } from "../../data/datatypes/eventDatatypes.ts";
import EventButton from "./EventButton.tsx";
import axios from "axios";
import { getTimeDetails } from "../../Utility.ts";
import { getEventPreviewsByDate, getOpenEvents } from "../../services/eventService.ts";

//An interface that contains the settings of the calendar
interface CalendarSettings {
    selectedDate: Date;
    dateAmount: number;
    isCompact: boolean;
    onlyOpenEvents: boolean | null;
}

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
    const dateArray = useMemo(() => {
        const dates = new Array<Date>();
        for (let i = 0; i < dateAmount; i++) {
            let date: Date = new Date(selectedDate);
            date.setDate(selectedDate.getDate() + i);
            dates.push(date);
        }
        return dates;
    }, [selectedDate, dateAmount]);

    const timeArray = useMemo(() => {
        const times = new Array<number>();
        for (let i = 0; i < 24; i++) {
            times.push(i);
        }
        return times;
    }, []);

    // Turns the date of an event int a key for a map
    function getDateKey(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }

    // Helper function to format date without timezone conversion
    function formatDateForAPI(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const fetchAllEvents = async () => {
            const newEvents = new Map<string, Map<number, EventPreview[]>>();
            try {
                for (const date of dateArray) {
                    const hourMap = new Map<number, EventPreview[]>();
                    const dateString = formatDateForAPI(date); // Use local timezone formatting

                    const openEvents: EventPreview[] = await getOpenEvents(dateString);
                    const userEvents: EventPreview[] = await getEventPreviewsByDate(dateString);

                    const eventMap = new Map<number, EventPreview>();

                    openEvents.forEach(event => {
                        eventMap.set(event.id, event);
                    });

                    userEvents.forEach(event => {
                        eventMap.set(event.id, event);
                    });

                    const events: EventPreview[] = Array.from(eventMap.values());

                    for (const event of events) {
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
    }, [selectedDate, dateAmount, onlyOpenEvents]);

    const displayCell = (date: Date, time: number) => {
        const hourMap = eventMap.get(getDateKey(date));
        const events: EventPreview[] = hourMap?.get(time) ?? [];

        return (
            <td className="calendar-table-cell" style={{ height: isCompact ? "40px" : "80px" }}>
                <div className="calendar-table-cell-half"></div>
                <div className="calendar-cell-content">
                    {
                        events.map((eventData) => (
                            <div key={eventData.id} onClick={() => { setSelectedEvent(eventData.id); setOpenEventPopup(true) }}>
                                <EventButton data={eventData} />
                            </div>
                        ))
                    }
                </div>
            </td>
        )
    }

    const displayDateHeaders = () => {
        return dateArray.map((date) => (
            <th key={date.toISOString()} className="calendar-table-cell">
                {getTimeDetails(date, date).date}
            </th>
        ));
    };

    const displayTimeRows = () => {
        return timeArray.map((time) => (
            <tr className="calendar-table-row" key={time}>
                <td className="calendar-table-cell">{time}:00</td>
                {dateArray.map((date) => displayCell(date, time))}
            </tr>
        ));
    };

    return (
        <div className="calendar">
            <table cellSpacing={0} className="calendar-table">
                <thead className="calendar-table-head">
                    <tr className="calendar-table-row">
                        <th className="calendar-table-cell"> </th>
                        {displayDateHeaders()}
                    </tr>
                </thead>
                <tbody>
                    {displayTimeRows()}
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