import { client } from "./client.ts";

// Gets minimal information of all the users that can be invited to an event (All users that are not already invited)
export const getInvitableUsers = async (attendeeIds: number[]): Promise<Map<number, string>> => {
    const response = await client.get("/api/user");
    const invited = new Set(attendeeIds);
    const result = new Map<number, string>();

    response.data
        .filter((u: { id: number }) => !invited.has(u.id))
        .forEach((u: { id: number; name: string }) => result.set(u.id, u.name));

    return result;
}