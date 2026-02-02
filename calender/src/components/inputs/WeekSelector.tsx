import { useEffect, useState } from "react";
import { getTimeDetails } from "../../Utility.ts";

interface WeekSelectorProps {
    getDate: (date: Date) => void;
}
const WeekSelector: React.FC<WeekSelectorProps> = ({ getDate }) => {
    const [selectedWeek, setSelectedWeek] = useState<number>(getWeekNumber);
    const currentYear = new Date().getFullYear();

    function getWeekNumber() {
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 1);
        const diff = today.getTime() - start.getTime();
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.ceil(diff / oneWeek);
    }

    function getDateOfWeek(week: number, year: number) {
        let day: number = (1 + (week - 1) * 7);
        let date = new Date(year, 0, day);

        let dayOfWeek = date.getDay();
        let daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        date.setDate(date.getDate() - daysToSubtract);

        return date;
    }

    const selectedDate = getDateOfWeek(selectedWeek, currentYear);
    const displayYear = selectedDate.getFullYear();

    const timeDetails = getTimeDetails(
        selectedDate,
        selectedDate
    );

    useEffect(() => {
        getDate(selectedDate)
    }, [selectedWeek])

    return (
        <div className="week-seelctor-container">
            <button onClick={() => setSelectedWeek(selectedWeek - 1)}>{"<"}</button>
            <p>{timeDetails.date} {displayYear}</p>
            <button onClick={() => setSelectedWeek(selectedWeek + 1)}>{">"}</button>

        </div>
    )
}

export default WeekSelector;