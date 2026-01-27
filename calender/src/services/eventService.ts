import axios from "axios";
import { EventDto, EventPreview } from "../data/datatypes/eventDatatypes";


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

// Updates an event
export const updateEvent = async (event: EventDto) => {
    const adjustedStartDate = new Date(event.startDate.getTime() - (event.startDate.getTimezoneOffset() * 60000));
    const adjustedEndDate = new Date(event.endDate.getTime() - (event.endDate.getTimezoneOffset() * 60000));

    await axios.put(`${API_BASE}/event/edit/${event.id}`, {
        Id: event.id,
        Title: event.title,
        Description: event.description,
        RoomId: event.roomMinimal.id,
        StartDate: adjustedStartDate.toISOString(),
        EndDate: adjustedEndDate.toISOString(),
        IsOpen: event.isOpen,
    });
};

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

export const getAllEvents = async (): Promise<{ id: number; title: string; date: string; }[]> => {
    const response = await axios.get<{ id: number; title: string; date: string; }[]>(`${API_BASE}/event/all`);

    return response.data;
};