import { EventPreview } from "../../data/datatypes/eventDatatypes";
import { getTimeDetails } from "../../Utility.ts";

interface ManagementEventProperties {
    eventData: EventPreview;
    onSelect: () => void;
}

const ManageEventCard: React.FC<ManagementEventProperties> = ({ eventData, onSelect }) => {
    const timeDetails = getTimeDetails(
        eventData.startDate,
        eventData.endDate
    );
    return (
        <div className="event-management-card" onClick={onSelect}>
            <h2 className="event-manegement-card-title">{eventData.title}</h2>
            <div>
                <p>{timeDetails.date}</p>
                <p>{timeDetails.timeframe}</p>
                <p>{timeDetails.duration}</p>
            </div>
        </div>
    )
}

export default ManageEventCard;