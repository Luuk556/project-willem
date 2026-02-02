import CustomCheckbox from "../inputs/CustomCheckbox.tsx";
import CustomDropdown from "../inputs/CustomDropdown.tsx";
import CustomInput from "../inputs/CustomInput.tsx";
import WeekSelector from "../inputs/WeekSelector.tsx";
import Calendar from "./calendar.tsx"
import { useState } from "react";

const CalendarScreen = () => {

    const [date, setDate] = useState(new Date());
    const [dayAmount, setDayAmount] = useState(5);
    const [isCompact, setIsCompact] = useState(false);
    const [showWeekends, setShowWeekends] = useState<boolean>(false);

    return (
        <div className="calendar">
            <div className="calendar-sidemenu">

                <WeekSelector
                    getDate={setDate}
                />

                <CustomCheckbox
                    label="Compact view"
                    defaultValue={isCompact}
                    onChange={setIsCompact}
                />

                <CustomCheckbox
                    label="Show weekends"
                    defaultValue={showWeekends}
                    onChange={setShowWeekends}
                />
            </div>
            <div className="calendar-window">
                <Calendar
                    selectedDate={date}
                    dateAmount={showWeekends ? 7 : 5}
                    isCompact={isCompact}
                    onlyOpenEvents={false}
                />
            </div>

        </div>
    );
};
export default CalendarScreen;