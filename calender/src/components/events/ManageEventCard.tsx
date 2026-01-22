import { EventPreview } from "../../data/datatypes/eventDatatypes";

interface ManagementEventProperties {
    eventData: EventPreview;
    onSelect: () => void;
}

const ManageEventCard: React.FC<ManagementEventProperties> = ({ eventData, onSelect }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function getMinute(inputDate: Date): number {
        return inputDate.getMinutes() + inputDate.getHours() * 60
    }
    const date: string = `${days[eventData.startDate.getDay()]} ${eventData.startDate.getDate()} ${months[eventData.startDate.getMonth()]}`;
    const eventDuration: string = `${eventData.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${eventData.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${getMinute(eventData.endDate) - getMinute(eventData.startDate)} minutes)`;
    return (
        <div className="event-management-card" onClick={onSelect}>
            <h2 className="event-manegement-card-title">{eventData.title}</h2>
            <div>
                <p>{date}</p>
                <p>{eventDuration}</p>
            </div>
        </div>
    )
}

export default ManageEventCard;