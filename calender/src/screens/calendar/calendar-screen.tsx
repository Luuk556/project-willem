import "./calendar-screen.css"
import Calendar from "../../components/calendar/calendar.tsx"
import { useState } from "react";
const CalendarScreen = () => {

    const [date, setDate] = useState(new Date());
    const [dayAmount, setDayAmount] = useState(5);
    const [isCompact, setIsCompact] = useState(false);
    return (
        <div className="calendar">
            <div className="calendar-sidemenu">
                <button className="calendar-newevent">New event</button>
                <input
                    type="date"
                    onChange={e => {
                        const selectedDate = e.target.value;
                        if (selectedDate) {
                            setDate(new Date(selectedDate));
                        }
                    }}
                />
                <select
                    defaultValue={5}
                    onChange={e => {
                        const selectedAmount = e.target.value;
                        if (selectedAmount) {
                            setDayAmount(Number(selectedAmount));
                        }
                    }}>
                    <option value="1">1 day</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                    <option value="4">4 days</option>
                    <option value="5">5 days</option>
                    <option value="6">6 days</option>
                    <option value="7">7 days</option>
                </select>
                <p>compact view</p>
                <input type="checkbox" className="calendar-screen-is-compact"
                    onChange={e => {
                        setIsCompact(e.target.checked);
                    }}
                />
            </div>
            <div className="calendar-window">
                <Calendar
                    //selectedDate={date}
                    selectedDate={new Date(2025, 9, 3)}
                    dateAmount={dayAmount}
                    isCompact={isCompact}
                />
            </div>

        </div>
    );
};
export default CalendarScreen;