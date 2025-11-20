//An interface that contains the data required for a preview of an event on the calendar
export interface EventPreview {
    eventName: string;
    startDate: Date;
    endDate: Date;
    eventID: number;
}

export interface EventDetails {
    ID: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    roomID: number;
    isOpenEvent: boolean;
    userList: number[];
}