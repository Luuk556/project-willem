import "./calendar.css"
import CalendarRow from "./calendar-row/calendar-row.tsx"
const Calendar = () => {
    return (
        <div className="calendar">
            <div></div>
            <CalendarRow />
            <CalendarRow />
            <CalendarRow />
            <CalendarRow />
            <CalendarRow />
        </div>
    )
}
export default Calendar;