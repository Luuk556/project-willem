//An interface that contains the data required for a preview of an event on the calendar
export interface EventPreview {
    eventName: string;
    duration: number;
    eventDate: Date;
    eventID: number;
}

export interface EventDetails {
    ID: number;
    title: string;
    description: string;
    startDate: Date;
    duration: number;
    roomID: number;
    isOpenEvent: boolean;
    userList: number[];
}