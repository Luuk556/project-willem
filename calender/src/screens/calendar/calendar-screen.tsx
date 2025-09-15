import "./calendar-screen.css"
import Calendar from "../../components/calendar/calendar.tsx"
const CalendarScreen = () => {
    return (
        <div className="calendar">
            <div className="calendar-sidemenu">
                <button className="calendar-newevent">New event</button>
            </div>
            <div className="calendar-window">
                <Calendar />
            </div>

        </div>
    );
};
export default CalendarScreen;