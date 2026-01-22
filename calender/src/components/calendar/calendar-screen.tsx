import CustomDropdown from "../inputs/CustomDropdown.tsx";
import CustomInput from "../inputs/CustomInput.tsx";
import Calendar from "./calendar.tsx"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CalendarScreen = () => {

    const [date, setDate] = useState(new Date());
    const [dayAmount, setDayAmount] = useState(5);
    const [isCompact, setIsCompact] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="calendar">
            <div className="calendar-sidemenu">
                <button onClick={() => {navigate("/event/create")}} className="calendar-newevent">New event</button>
                <CustomInput
                    type="date"
                    label="Select date:"
                    onChange={selectedDate => { setDate(new Date(selectedDate)); }}
                    defaultValue={date}
                />
                <CustomDropdown
                    onChange={selectedAmount => { setDayAmount(Number(selectedAmount)); }}
                    label="Amount of days:"
                    defaultValue={dayAmount}
                    values={[1, 2, 3, 4, 5, 6, 7]}
                />

                <p>compact view</p>
                <input type="checkbox" className="calendar-screen-is-compact"
                    onChange={e => {
                        setIsCompact(e.target.checked);
                    }}
                />
            </div>
            <div className="calendar-window">
                <Calendar
                    selectedDate={date}
                    //selectedDate={new Date(2025, 9, 3)}
                    dateAmount={dayAmount}
                    isCompact={isCompact}
                    onlyOpenEvents={false}
                />
            </div>

        </div>
    );
};
export default CalendarScreen;