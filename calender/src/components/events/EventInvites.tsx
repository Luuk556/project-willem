import { useState, useEffect } from "react";
import { EventPreview, EventDto } from "../../data/datatypes/eventDatatypes";
import ManageEventCard from "./ManageEventCard.tsx";
import CustomTextDisplay from "../displays/CustomTextDisplay.tsx";
import { getTimeDetails } from "../../Utility.ts";
import { acceptInvite, leaveEvent, rejectEventInvite } from "../../services/eventAttendanceService.ts";
import { getMyInvitedEvents, getMyAcceptedInvitedEvents, getEventDetails } from "../../services/eventService.ts";

const EventInvites: React.FC = () => {
    const [invites, setInvites] = useState<EventPreview[]>([]);
    const [acceptedInvites, setAcceptedInvites] = useState<EventPreview[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [eventData, setEventData] = useState<EventDto | null>(null)
    const [timeDetails, setTimeDetails] = useState<{
        date: string;
        timeframe: string;
        duration: string;
    } | null>(null)
    const [hasJoinedEvent, setHasJoinedEvent] = useState<boolean>(true)

    const fetchAllMyInvitedEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const events = await getMyInvitedEvents(token);
            setInvites(events);
        } catch (err) {
            console.error("Failed to fetch events:", err);
        }
    };

    const fetchAllMyAcceptedEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const events = await getMyAcceptedInvitedEvents(token);
            setAcceptedInvites(events);
        } catch (err) {
            console.error("Failed to fetch events:", err);
        }
    };
    useEffect(() => {
        fetchAllMyInvitedEvents();
        fetchAllMyAcceptedEvents();
    }, []);

    const fetchDetails = async () => {
        if (!selectedEventId) return;

        try {
            const details = await getEventDetails(selectedEventId);
            if (details) {
                setEventData(details);
                setTimeDetails(getTimeDetails(
                    new Date(details.startDate),
                    new Date(details.endDate)
                ));
            }
        } catch (err) {
            console.error("error fetching event data:", err);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [selectedEventId]);

    const refresh = async () => {
        await fetchAllMyInvitedEvents();
        await fetchAllMyAcceptedEvents();

        if (selectedEventId) {
            await fetchDetails();
        }
    };

    const acceptEventInvite = async (eventId: number) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            await acceptInvite(token, eventId)
            setHasJoinedEvent(true)
            await refresh()
        }
        catch (err) {
            console.error("Something went wrong trying to accept invitation: ", err);
        }
    }

    const leave = async (eventId: number) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await leaveEvent(token, eventId);
            setHasJoinedEvent(false)
            await refresh();
        }
        catch (err) {
            console.error("Something went wrong trying to leave event: ", err);
        }
    }

    const reject = async (eventId: number) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await rejectEventInvite(token, eventId);
            setEventData(null);
            setSelectedEventId(null);

            await refresh();
        }
        catch (err) {
            console.error("Something went wrong trying to reject invitation: ", err);
        }
    }

    return (
        <div className="event-management-screen">
            <div className="event-management-card-list">
                <h1>Invites</h1>
                {invites.map(i => {
                    return <ManageEventCard
                        eventData={i}
                        key={i.id}
                        onSelect={() => { setSelectedEventId(i.id); setHasJoinedEvent(false); }} />
                }
                )}
                <h1>Accepted</h1>
                {acceptedInvites.map(i => {
                    return <ManageEventCard
                        eventData={i}
                        key={i.id}
                        onSelect={() => { setSelectedEventId(i.id); setHasJoinedEvent(true); }} />
                }
                )}
            </div>

            <div className="event-details-panel">
                {eventData && timeDetails ? (
                    <div className="event-details-panel-container">
                        <div>
                            <h1>Event details</h1>
                            <CustomTextDisplay
                                label="Title: "
                                value={eventData.title}
                            />
                            <CustomTextDisplay
                                label="Description: "
                                value={eventData.description}
                            />
                            <CustomTextDisplay
                                label="Room: "
                                value={eventData.roomMinimal.name}
                            />
                            <CustomTextDisplay
                                label="Date: "
                                value={timeDetails.date}
                            />
                            <CustomTextDisplay
                                label="Timeframe: "
                                value={timeDetails.timeframe}
                            />
                            <CustomTextDisplay
                                label="Duration: "
                                value={timeDetails.duration}
                            />
                            {
                                hasJoinedEvent ? (
                                    <button onClick={() => leave(eventData.id)}>Leave event</button>
                                ) : (
                                    <div>
                                        <button onClick={() => acceptEventInvite(eventData.id)}>Accept invite</button>
                                        <button onClick={() => reject(eventData.id)}>Reject invite</button>
                                    </div>

                                )
                            }

                        </div>
                        <div>
                            <h1>Other people in this event</h1>
                            {eventData.attendees.map(a => {
                                if (!a.acceptedInvite) {
                                    return;
                                }
                                return (
                                    <CustomTextDisplay
                                        label=""
                                        value={a.name}
                                    />
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <p>Select an event to see details</p>
                )}
            </div>
        </div>

    )
}

export default EventInvites;