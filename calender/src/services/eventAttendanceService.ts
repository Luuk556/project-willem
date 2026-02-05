import { client } from "./client.ts";

// Invite user
export const inviteUserToEvent = async (userId: number, eventId: number) => {
    await client.post("/event-attendance/invite", {
        UserId: userId,
        EventId: eventId,
        AcceptedInvite: false,
    });
};

export const RevokeEventAttendance = async (userId: number, eventId: number) => {
    await client.post("/event-attendance/remove", {
        UserId: userId,
        EventId: eventId,
    });
};

export const acceptInvite = async (eventId: number) => {
    await client.put(`/event-attendance/accept/${eventId}`);
};

export const leaveEvent = async (eventId: number) => {
    await client.put(`/event-attendance/leave/${eventId}`);
};

export const rejectEventInvite = async (eventId: number) => {
    await client.post(`/event-attendance/reject/${eventId}`);
};

export const addAttendance = async (eventId: number) => {
    await client.post("/event-attendance/add", null, {
        params: { eventId },
    });
};

export const getEventAttendance = async (id: number) => {
    const response = await client.get("/event-attendance/get", {
        params: { eventId: id },
    });
    return response.data;
};
