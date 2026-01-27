import axios from "axios";
import RoomMap from "../components/rooms/roomMap";

const API_BASE = "http://localhost:5184";

// Gets the minimal information of all the rooms
export const getAllRooms = async (): Promise<Map<number, string>> => {
    const response = await axios.get(`${API_BASE}/room/all`);

    const result = new Map<number, string>();
    response.data.forEach((r: { id: number; name: string }) => {
        result.set(r.id, r.name);
    });

    return result;
};

export const getRoomMapDetails = async (selectedDate: Date): Promise<RoomMap[]> => {
    const response = await axios.get<RoomMap[]>(`${API_BASE}/room/map`, {
        params: {
            date: selectedDate
        }
    });
    return response.data
}

export const getUsersInRoom = async (id: string | undefined): Promise<{ userId: number; name: string }[]> => {
    const response = await axios.get<{ userId: number; name: string }[]>(`${API_BASE}/api/rooms/${id}/active-users`);
    return response.data
}