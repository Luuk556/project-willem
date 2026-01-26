import axios from "axios";
import { EventDto, EventPreview } from "./data/datatypes/eventDatatypes";

const API_BASE = "http://localhost:5184";

// Gets minimal information of the events of the logged in user
export const getMyEvents = async (token: string): Promise<EventPreview[]> => {
    const response = await axios.get(
        `${API_BASE}/event/my-events`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return response.data.events.map((e: any) => ({
        ...e,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
    }));
};

// Gets all the details of a specific event
export const getEventDetails = async (eventId: number): Promise<EventDto> => {
    const response = await axios.get(
        `${API_BASE}/event/details`,
        {
            params: { eventId }
        }
    );

    return response.data;
};

// Invites a user to an event
export const inviteUserToEvent = async (userId: number, eventId: number) => {
    await axios.post(`${API_BASE}/event-attendance/invite`, {
        UserId: userId,
        EventId: eventId,
        AcceptedInvite: false,
    });
};

// Updates an event
export const updateEvent = async (event: EventDto) => {
    await axios.put(`${API_BASE}/event/edit/${event.id}`, {
        Id: event.id,
        Title: event.title,
        Description: event.description,
        RoomId: event.roomMinimal.id,
        StartDate: new Date(event.startDate),
        EndDate: new Date(event.endDate),
        IsOpen: event.isOpen,
    });
};

// Gets the minimal information of all the rooms
export const getAllRooms = async (): Promise<Map<number, string>> => {
    const res = await axios.get(`${API_BASE}/room/all`);

    const result = new Map<number, string>();
    res.data.forEach((r: { id: number; name: string }) => {
        result.set(r.id, r.name);
    });

    return result;
};

// Gets minimal information of all the users that can be invited to an event (All users that are not already invited)
export const getInvitableUsers = async (attendeeIds: number[]): Promise<Map<number, string>> => {
    const res = await axios.get(`${API_BASE}/api/user`);

    const invited = new Set(attendeeIds);
    const result = new Map<number, string>();

    res.data
        .filter((u: { id: number }) => !invited.has(u.id))
        .forEach((u: { id: number; name: string }) => {

            result.set(u.id, u.name);
        });

    return result;
};

// Removes the event attendance of a user
export const RevokeEventAttendance = async (userId: number, eventId: number) => {
    await axios.post(`${API_BASE}/event-attendance/remove`,
        {
            UserId: userId,
            EventId: eventId
        }
    )
}

// Gets the events of a user where the user is only invited, but has not yet accepted
export const getMyInvitedEvents = async (token: string): Promise<EventPreview[]> => {
    const response = await axios.get(
        `${API_BASE}/event/my-invitations`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return response.data.events.map((e: any) => ({
        ...e,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
    }));
};

// Gets the events of a user where the user has accepted the invite
export const getMyAcceptedInvitedEvents = async (token: string): Promise<EventPreview[]> => {
    const response = await axios.get(
        `${API_BASE}/event/my-accepted-invitations`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return response.data.events.map((e: any) => ({
        ...e,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
    }));
};

// Deletes an event

// Gets the minimal information of all events a user is invited to / is participating

// Allows the logged in user to accept an invite for an event
export const acceptInvite = async (token: string, eventId: number) => {
    await axios.put(`${API_BASE}/event-attendance/accept/${eventId}`,
        null,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )
}

// Allows the logged in user to leave an event
export const leaveEvent = async (token: string, eventId: number) => {
    await axios.put(`${API_BASE}/event-attendance/leave/${eventId}`,
        null,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )
}

// Rejects an event invitation
export const rejectEventInvite = async (token: string, eventId: number) => {
    await axios.post(`${API_BASE}/event-attendance/reject/${eventId}`,
        null,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )
};