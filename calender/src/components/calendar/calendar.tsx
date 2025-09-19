import "./calendar.css"

interface EventTime {
    eventName: string;
    duration: number;
    eventDate: Date;
}

interface CalendarSettings {
    selectedDate: Date;
    dateAmount: number;

}

const Calendar: React.FC<CalendarSettings> = ({
    selectedDate = new Date(2025, 8, 16),
    dateAmount = 5
}) => {
    const dateArray = new Array<Date>

    for (let i = 0; i < dateAmount; i++) {
        let date: Date = new Date(Date.now());
        date.setDate(selectedDate.getDate() + i)
        dateArray.push(date)
    }

    const timeArray = new Array<number>()
    for (let i = 0; i < 24; i++) {
        timeArray.push(i);
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
    function getDayName(dayIndex: number) {
        return days[dayIndex]
    }

    const eventList: EventTime[] = new Array<EventTime>(
        {
            eventName: "event 1",
            duration: 30,
            eventDate: new Date(2025, 8, 17, 15)
        },
        {
            eventName: "event 2",
            duration: 60,
            eventDate: new Date(2025, 8, 17, 11)
        },
        {
            eventName: "event 3",
            duration: 15,
            eventDate: new Date(2025, 8, 18, 11)
        },
        {
            eventName: "event 4",
            duration: 45,
            eventDate: new Date(2025, 8, 18, 11, 15)
        })

    function getEvent(date: Date, time: number) {
        let events = new Array<EventTime>
        for (const eventEntry of eventList) {
            const eventDate = eventEntry.eventDate;
            if (
                eventDate.getFullYear() === date.getFullYear() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getDate() === date.getDate()
            ) {
                if (eventDate.getHours() >= time && eventDate.getHours() < time + 1) {
                    events.push(eventEntry)
                    console.log(eventEntry.eventDate.getMinutes() / 60 * 100 + "%")
                }

            }
        }
        return events;
    }

    return (
        <div className="calendar">
            <table cellSpacing={0} className="calendar-table">
                <thead>
                    <tr>
                        <td className="calendar-table-cell"> </td>
                        {
                            dateArray.map((date) => (
                                <th className="calendar-table-cell">{getDayName(date.getDay())}</th>
                            ))
                        }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        timeArray.map((time) => (
                            <tr>
                                <td className="calendar-table-cell">{time + ":00"}</td>
                                {
                                    dateArray.map((date) => {
                                        const events = getEvent(date, time)
                                        return (
                                            <td className="calendar-table-cell">
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