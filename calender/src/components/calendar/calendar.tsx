import { useEffect, useState } from "react";
import CalendarEvent from "../events/calendarEvent.tsx";
import PopupComponent from "../popup/popup.tsx";
import { EventPreview } from "../../data/datatypes/eventDatatypes.ts";
import EventButton from "./EventButton.tsx";
import axios from "axios";
import { getTimeDetails } from "../../Utility.ts";


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


    // Turns the date of an event int a key for a map
    function getDateKey(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }


    useEffect(() => {
        const fetchAllEvents = async () => {
            const newEvents = new Map<string, Map<number, EventPreview[]>>();
            try {
                const token = localStorage.getItem("token");
                if (!token) return;
                
                for (const date of dateArray) {
                    const hourMap = new Map<number, EventPreview[]>();

                    // Send date as YYYY-MM-DD to avoid timezone shifts
                    const dateString = date.toISOString().split('T')[0];
                    console.debug("Fetching events for date", dateString);

                    // Fetch open events (no auth required)
                    const openResponse = await axios.get<any[]>(
                        "http://localhost:5184/event/open",
                        { params: { date: dateString } }
                    );

                    const openEvents: any[] = openResponse.data || [];

                    // Fetch user-specific events (requires token)
                    let userEvents: any[] = [];
                    try {
                        const userResponse = await axios.get<any[]>(
                            "http://localhost:5184/event/event-previews",
                            {
                                params: { date: dateString },
                                headers: { Authorization: `Bearer ${token}` }
                            }
                        );
                        userEvents = userResponse.data || [];
                    } catch (e) {
                        // ignore auth errors (user not logged in)
                        userEvents = [];
                    }

                    // Fetch all events and filter by date (includes closed events)
                    let allEvents: any[] = [];
                    try {
                        const allResponse = await axios.get<any[]>("http://localhost:5184/event/all");
                        const allData = allResponse.data || [];
                        const dateStart = new Date(date);
                        dateStart.setHours(0,0,0,0);
                        const dateEnd = new Date(date);
                        dateEnd.setHours(23,59,59,999);

                        // Include only events that start on this date (prevents old multi-day events from showing)
                        allEvents = allData.filter(ev => {
                            const s = new Date(ev.StartDate ?? ev.startDate);
                            return s >= dateStart && s <= dateEnd;
                        });

                        // Debug logging to help identify unexpected events
                        console.debug("Calendar fetch for date", date.toDateString(), "counts -> open:", openEvents.length, "user:", userEvents.length, "allFiltered:", allEvents.length, "ids:", allEvents.map(a => a.Id ?? a.id));
                    } catch (e) {
                        allEvents = [];
                    }

                    // Merge and deduplicate by id (prioritize detailed allEvents/userEvents over openEvents)
                    const mergedById = new Map<number, any>();
                    for (const ev of [...openEvents, ...userEvents, ...allEvents]) {
                        mergedById.set(ev.Id ?? ev.id, ev);
                    }

                    const events: EventPreview[] = Array.from(mergedById.values()).map((ev: any) => {
                        // normalize fields and add isOpen flag
                        const normalized: any = {
                            id: ev.Id ?? ev.id,
                            title: ev.Title ?? ev.title,
                            startDate: new Date(ev.StartDate ?? ev.startDate),
                            endDate: new Date(ev.EndDate ?? ev.endDate),
                            isOpen: (ev.IsOpen ?? ev.isOpen) !== undefined ? (ev.IsOpen ?? ev.isOpen) : true
                        };
                        return normalized as EventPreview;
                    });

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