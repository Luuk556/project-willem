import { useEffect, useState } from "react"
import ManageEventCard from "./ManageEventCard.tsx"
import { EventDetails, EventPreview } from "../../data/datatypes/eventDatatypes.ts"
import axios, { AxiosError } from "axios"
import EventDetailsPanel from "./EventDetailsPanel.tsx"

const EventManagementScreen: React.FC = () => {
    const [myEvents, setMyEvents] = useState<EventPreview[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [eventData, setEventData] = useState<EventDetails | null>(null)

    useEffect(() => {
        const fetchAllMyEvents = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new AxiosError;

                const response = await axios.get(
                    "http://localhost:5184/event/my-events",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const mappedEvents = response.data.events.map((e: any) => ({
                    ...e,
                    startDate: new Date(e.startDate),
                    endDate: new Date(e.endDate),
                }));

                setMyEvents(mappedEvents);

            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        }
        fetchAllMyEvents()
    }, [])

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5184/event/details",
                    {
                        params: {
                            eventId: selectedEventId
                        }
                    }
                )

                setEventData(response.data)
            }

            catch (err) {
                console.error("error fetching event data:", err)
            }
        }

        if (selectedEventId) {
            fetchEventDetails()
        }
    }, [selectedEventId])
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
                <h1>Edit event</h1>
                {eventData ? (
                    <EventDetailsPanel data={eventData} />
                ) : (
                    <p>Select an event to see details</p>
                )}
            </div>
        </div>

    )
}

export default EventManagementScreen