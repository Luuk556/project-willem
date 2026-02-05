import { client } from "./client.ts";


export const getTodayAttendance = async () => {
    const response = await client.get("/attendance/today");
    return response.data;
}

export const addAttendance = async (roomId: number) => {
    await client.post("/attendance", {
        RoomId: roomId
    });
}

export const updateAttendance = async (roomId: number) => {
    await client.put("/attendance", {
        RoomId: roomId
    });
}

export const endAttendance = async () => {
    await client.post("/attendance/end");
}

export const isUserPresentInRoom = async (roomId: number): Promise<boolean> => {
    const response = await client.get(`/attendance/is-present/${roomId}`);
    return response.data.isPresent;
}