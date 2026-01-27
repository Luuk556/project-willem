import axios from "axios";

const API_BASE = "http://localhost:5184";

// Invites a user to an event
export const inviteUserToEvent = async (userId: number, eventId: number) => {
    await axios.post(`${API_BASE}/event-attendance/invite`, {
        UserId: userId,
        EventId: eventId,
        AcceptedInvite: false,
    });
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

export const addAttendance = async (token: string, eventId: number) => {
    await axios.post(`${API_BASE}/event-attendance/`,
        null,
        {
            params: { eventId: eventId },
            headers: { Authorization: `Bearer ${token}` }
        }
    )
};

export const getEventAttendance = async (token: string, id: number) => {
    const response = await axios.get(
        "http://localhost:5184/event-attendance/get",
        {
            params: {
                eventId: id
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
}