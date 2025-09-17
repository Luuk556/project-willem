import "./calendar.css"

interface eventTime {
    eventName: string;
    duration: number;
    eventDate: Date;
}

interface calendarSettings {
    selectedDate: Date;
    dateAmount: number;

}

const Calendar: React.FC<calendarSettings> = ({
    selectedDate = new Date(Date.now()),
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

    const eventList: eventTime[] = new Array<eventTime>(
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
            duration: 60,
            eventDate: new Date(2025, 8, 18, 11)
        },
        {
            eventName: "event 4",
            duration: 60,
            eventDate: new Date(2025, 8, 18, 11)
        })

    function getEvent(date: Date, time: number) {
        let events = new Array<eventTime>
        for (const eventEntry of eventList) {
            const eventDate = eventEntry.eventDate;
            if (
                eventDate.getFullYear() === date.getFullYear() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getDate() === date.getDate()
            ) {
                if (eventDate.getHours() >= time && eventDate.getHours() < time + 1) {
                    events.push(eventEntry)
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
                                                        <div className="calendar-event-button">{eventData.eventName}</div>
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