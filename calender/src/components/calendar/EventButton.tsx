import { Link } from "react-router-dom"
import { EventPreview } from "../../data/datatypes/eventDatatypes";

interface EventButtonProps {
    data: EventPreview;
}

const EventButton: React.FC<EventButtonProps> = ({ data: eventData }: EventButtonProps) => {

    const getEventHeight = (start: Date, end: Date): string => {
        const duration = (end.getTime() - start.getTime()) / 1000 / 60;
        const heightPercent = duration / 60 * 100;
        return `${heightPercent}%`;
    }

    const getEventTop = (start: Date): string => {
        const minutes = start.getMinutes();
        const topPercent = minutes / 60 * 100;
        return `${topPercent}%`;
    }

    return (
        <button
            key={eventData.id}
            style={{ 
                height: getEventHeight(eventData.startDate, eventData.endDate), 
                top: getEventTop(eventData.startDate),
                backgroundColor: eventData.isOpen === false ? '#ff6b6b' : undefined
            }}
            className="calendar-event-button"
        >{eventData.title}</button>
    )
}

export default EventButton