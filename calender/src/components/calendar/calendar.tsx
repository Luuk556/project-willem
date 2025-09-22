//An interface that contains the data required for a preview of an event on the calendar
interface EventPreview {
    eventName: string;
    duration: number;
    eventDate: Date;
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
            eventName: "event 1",
            duration: 30,
            eventDate: new Date(2025, 8, 23, 11)
        },
        {
            eventName: "event 2",
            duration: 60,
            eventDate: new Date(2025, 8, 23, 15)
        },
        {
            eventName: "event 3",
            duration: 15,
            eventDate: new Date(2025, 8, 24, 11)
        },
        {
            eventName: "event 4",
            duration: 45,
            eventDate: new Date(2025, 8, 24, 11, 15)
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
                                <th className="calendar-table-cell">{getDayName(date.getDay())} {date.getMonth()} / {date.getDate()}</th>
                            ))
                        }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        timeArray.map((time) => (
                            <tr className="calendar-table-row">
                                <td className="calendar-table-cell">{time + ":00"}</td>
                                {
                                    dateArray.map((date) => {
                                        const events = getEvent(date, time)
                                        return (
                                            <td className="calendar-table-cell" style={{ height: isCompact ? "40px" : "80px" }}>
                                                <div className="calendar-table-cell-half"></div>
                                                {
                                                    events.map((eventData) => (
                                                        <div style={{ height: eventData.duration / 60 * 100 + "%", top: eventData.eventDate.getMinutes() / 60 * 100 + "%" }} className="calendar-event-button">{eventData.eventName}</div>
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
        </div>
    )
}
export default Calendar;