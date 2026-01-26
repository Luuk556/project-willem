//An interface that contains the data required for a preview of an event on the calendar
export interface EventPreview {
    title: string;
    startDate: Date;
    endDate: Date;
    id: number;
}

export interface EventDetails {
    ID: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    roomId: number;
    isOpen: boolean;
    OrganizerId: number;
}

export interface EventDto {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isOpen: boolean;
    organizerId: number;
    roomMinimal: {
        id: number;
        name: string;
    };
    attendees: {
        id: number;
        name: string;
        acceptedInvite: boolean;
    }[]
}