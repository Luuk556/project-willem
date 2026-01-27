import { client } from "./client.ts";
import RoomMap from "../components/rooms/roomMap";
// Gets minimal info of all rooms
export const getAllRooms = async (): Promise<Map<number, string>> => {
    const response = await client.get("/room/all");
    const result = new Map<number, string>();
    response.data.forEach((r: { id: number; name: string }) => {
        result.set(r.id, r.name);
    });
    return result;
};

// Gets room map details for a given date
export const getRoomMapDetails = async (selectedDate: Date): Promise<RoomMap[]> => {
    const response = await client.get("/room/map", {
        params: { date: selectedDate },
    });
    return response.data;
};

// Gets active users in a specific room
export const getUsersInRoom = async (
    id: string | undefined
): Promise<{ userId: number; name: string }[]> => {
    const response = await client.get(`/api/rooms/${id}/active-users`);
    return response.data;
};