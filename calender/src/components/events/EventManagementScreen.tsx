import { useEffect, useState } from "react"
import ManageEventCard from "./ManageEventCard.tsx"
import { EventDto, EventPreview } from "../../data/datatypes/eventDatatypes.ts"
import EventDetailsPanel from "./EventDetailsPanel.tsx"
import { getEventDetails, getMyEvents } from "../../backendCall.ts"

const EventManagementScreen: React.FC = () => {
    const [myEvents, setMyEvents] = useState<EventPreview[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [eventData, setEventData] = useState<EventDto | null>(null)

    const fetchAllMyEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const events = await getMyEvents(token);
            setMyEvents(events);
        } catch (err) {
            console.error("Failed to fetch events:", err);
        }
    };
    useEffect(() => {
        fetchAllMyEvents();
    }, []);

    const fetchDetails = async () => {
        if (!selectedEventId) return;

        try {
            const details = await getEventDetails(selectedEventId);
            setEventData(details);
        } catch (err) {
            console.error("error fetching event data:", err);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [selectedEventId]);

    return (
        <div className="event-management-screen">
            <div className="event-management-card-list">
                <h1>My events</h1>
                {myEvents.map(e => {
                    return <ManageEventCard
                        eventData={e}
                        key={e.id}
                        onSelect={() => setSelectedEventId(e.id)} />
                }
                )}
            </div>

            <div className="event-details-panel">
                {eventData ? (
                    <EventDetailsPanel
                        data={eventData}
                        requestRefresh={fetchDetails}
                    />
                ) : (
                    <p>Select an event to see details</p>
                )}
            </div>
        </div>

    )
}

export default EventManagementScreen