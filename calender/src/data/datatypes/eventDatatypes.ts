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
    roomID: number;
    isOpen: boolean;
    OrganizerId: number;
}