import axios from "axios";
import { EventDto, EventPreview } from "./data/datatypes/eventDatatypes";

const API_BASE = "http://localhost:5184";

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

export const getEventDetails = async (eventId: number): Promise<EventDto> => {
    const response = await axios.get(
        `${API_BASE}/event/details`,
        {
            params: { eventId }
        }
    );

    return response.data;
};

export const inviteUserToEvent = async (userId: number, eventId: number) => {
    await axios.post(`${API_BASE}/event-attendance/invite`, {
        UserId: userId,
        EventId: eventId,
        AcceptedInvite: false,
    });
};

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

export const getAllRooms = async (): Promise<Map<number, string>> => {
    const res = await axios.get(`${API_BASE}/room/all`);

    const result = new Map<number, string>();
    res.data.forEach((r: { id: number; name: string }) => {
        result.set(r.id, r.name);
    });

    return result;
};

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

export const RevokeEventAttendance = async (userId: number, eventId: number) => {
    await axios.post(`${API_BASE}/event-attendance/remove`,
        {
            UserId: userId,
            EventId: eventId
        }
    )
}