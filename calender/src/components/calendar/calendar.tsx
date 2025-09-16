import "./calendar.css"

interface eventTime {
    eventName: string;
    duration: number;
    eventDate: Date;
}
const Calendar = () => {
    const dateArray = new Array<String>("Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday", "Sunday")
    const timeArray = new Array<String>(
        "0:00",
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00",
        "6:00",
        "7:00",
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00")

    const eventList: eventTime[] = new Array<eventTime>(
        {
            eventName: "1",
            duration: 30,
            eventDate: new Date(2024, 7, 22, 9, 15)
        },
        {
            eventName: "2",
            duration: 60,
            eventDate: new Date(2024, 7, 22, 11)
        },
        {
            eventName: "3",
            duration: 60,
            eventDate: new Date(2024, 7, 23, 11)
        })

    return (
        <div className="calendar">{
        }

            <table cellSpacing={0} className="calendar-table">
                <thead>
                    <tr>
                        <td className="calendar-table-cell"> </td>
                        {
                            dateArray.map((day) => (
                                <th className="calendar-table-cell">{day}</th>
                            ))
                        }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        timeArray.map((time, index) => (
                            <tr>
                                <td className="calendar-table-cell">{time}</td>
                                {
                                    dateArray.map((day) => (
                                        <td className="calendar-table-cell">events on {day} between {time} and {timeArray[index + 1]}</td>
                                    ))
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