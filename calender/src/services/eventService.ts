// eventService.ts
import { client } from "./client.ts";
import { EventDto, EventPreview } from "../data/datatypes/eventDatatypes";

// Helper to parse EventPreview dates
const parseEventPreviewDates = (events: any[]): EventPreview[] =>
    events.map((e: any) => ({
        ...e,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
    }));

// Gets minimal information of the events of the logged in user
export const getMyEvents = async (): Promise<EventPreview[]> => {
    const response = await client.get("/event/my-events");
    console.log(response)
    return parseEventPreviewDates(response.data);
};

// Gets all details of a specific event
export const getEventDetails = async (eventId: number): Promise<EventDto> => {
    const response = await client.get("/event/details", { params: { eventId } });
    return response.data;
};

// Updates an event
export const updateEvent = async (event: EventDto) => {
    const adjustedStartDate = new Date(
        event.startDate.getTime() - event.startDate.getTimezoneOffset() * 60000
    );
    const adjustedEndDate = new Date(
        event.endDate.getTime() - event.endDate.getTimezoneOffset() * 60000
    );

    await client.put(`/event/edit/${event.id}`, {
        Id: event.id,
        Title: event.title,
        Description: event.description,
        RoomId: event.roomMinimal.id,
        StartDate: adjustedStartDate.toISOString(),
        EndDate: adjustedEndDate.toISOString(),
        IsOpen: event.isOpen,
    });
};

// Gets events the user is invited to but hasn't accepted
export const getMyInvitedEvents = async (): Promise<EventPreview[]> => {
    const response = await client.get("/event/my-invitations");
    return parseEventPreviewDates(response.data);
};

// Gets events the user has accepted invites for
export const getMyAcceptedInvitedEvents = async (): Promise<EventPreview[]> => {
    const response = await client.get("/event/my-accepted-invitations");
    return parseEventPreviewDates(response.data);
};

// Gets all events
export const getAllEvents = async (): Promise<{ id: number; title: string; date: string }[]> => {
    const response = await client.get("/event/all");
    return response.data;
};
