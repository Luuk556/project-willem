import { useEffect, useState } from "react";
import { EventDto } from "../../data/datatypes/eventDatatypes"
import CustomInput from "../inputs/CustomInput.tsx";
import CustomCheckbox from "../inputs/CustomCheckbox.tsx";
import CustomSearchBox from "../inputs/CustomSearchBox.tsx";
import { toLocalDatetimeInput } from "../../Utility.ts";
import { inviteUserToEvent, RevokeEventAttendance } from "../../services/eventAttendanceService.ts";
import { deleteEvent, updateEvent } from "../../services/eventService.ts";
import { getAllRooms } from "../../services/roomService.ts";
import { getInvitableUsers } from "../../services/userService.ts";

interface EventDetailsPanelProps {
    data: EventDto;
    requestRefresh: () => void;
    onDeleteEvent: () => void;
}
const EventDetailsPanel: React.FC<EventDetailsPanelProps> = ({ data, requestRefresh, onDeleteEvent }) => {
    useEffect(() => {
        setEventData(data);
    }, [data]);
    const [eventData, setEventData] = useState<EventDto>(data);
    const [rooms, setRooms] = useState<Map<number, string>>(new Map());
    const [allUsers, setAllUsers] = useState<Map<number, string>>(new Map());
    const [userToInvite, setUserToInvite] = useState<number>(-1);



    useEffect(() => {
        const loadUsers = async () => {
            try {
                const users = await getInvitableUsers(
                    data.attendees.map(a => a.id)
                );
                setAllUsers(users);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        };

        loadUsers();
    }, [data.attendees]);

    useEffect(() => {
        const loadRooms = async () => {
            try {
                const rooms = await getAllRooms();
                setRooms(rooms);
            } catch (err) {
                console.error("Failed to fetch rooms:", err);
            }
        };

        loadRooms();
    }, []);

    const saveChanges = async () => {
        try {
            await updateEvent(eventData);
            requestRefresh();
        } catch (err) {
            console.error("Failed to save event edits:", err);
        }
    };

    const inviteUser = async () => {
        try {
            await inviteUserToEvent(userToInvite, eventData.id);

            setAllUsers(prev => {
                const map = new Map(prev);
                map.delete(userToInvite);
                return map;
            });

            requestRefresh();
        } catch (err) {
            console.error("Failed to invite user:", err);
        }
    };

    const revokeAttendance = async (userId: number) => {
        try {
            await RevokeEventAttendance(userId, eventData.id)
            requestRefresh();
        } catch (err) {
            console.log("Failed to revoke attendance of event:", err)
        }
    }

    const fetchDeleteEvent = async () => {
        try {
            await deleteEvent(eventData.id);
            onDeleteEvent();
        }
        catch (err) {
            console.error("Could not delete event: ", err)
        }
    }



    function displayUsersInEvent() {
        const accepted = eventData.attendees.filter(a => a.id !== eventData.organizerId && a.acceptedInvite);
        const invited = eventData.attendees.filter(a => a.id !== eventData.organizerId && !a.acceptedInvite);
        eventData.attendees.forEach(a => console.log(a))
        return (
            <div>
                <h1>People in this event</h1>
                <p>Accepted invite:</p>
                {accepted.map(a => {
                    return displayuser(a.id, a.name);
                })}
                <p>Invited, but hasnt accepted yet:</p>
                {invited.map(i => {
                    return displayuser(i.id, i.name);
                })}
            </div>
        )
    }

    function displayuser(userId: number, userName: string) {
        return (
            <div key={userId} className="edit-event-user">
                <p>{userName}</p>
                <button onClick={() => revokeAttendance(userId)}>Remove</button>
            </div>
        )
    }

    return (
        <div className="event-details-panel-container">
            <div>
                <h1>Edit event</h1>
                <CustomInput
                    type="text"
                    label="Title"
                    defaultValue={eventData.title}
                    onChange={(e) => setEventData(prev => ({ ...prev, title: e }))}
                />
                <CustomInput
                    type="text"
                    label="Description"
                    defaultValue={eventData.description}
                    onChange={(e) => setEventData(prev => ({ ...prev, description: e }))}
                />

                <CustomSearchBox
                    items={rooms}
                    defaultValueId={eventData.roomMinimal.id}
                    label="Select room"
                    onSelect={(id) => setEventData(prev => ({
                        ...prev,
                        roomMinimal: {
                            ...prev.roomMinimal,
                            id: id
                        }
                    }))}
                />

                <CustomInput
                    type="datetime-local"
                    label="Start Date"
                    defaultValue={toLocalDatetimeInput(eventData.startDate)}
                    onChange={(e) => {
                        const value = e;
                        if (!value) return;
                        const newDate = new Date(value);
                        if (!isNaN(newDate.getTime())) {
                            setEventData(prev => ({ ...prev, startDate: newDate }));
                        }
                    }}
                />

                <CustomInput
                    type="datetime-local"
                    label="End Date"
                    defaultValue={toLocalDatetimeInput(eventData.endDate)}
                    onChange={(e) => {
                        const value = e;
                        if (!value) return;
                        const newDate = new Date(value);
                        if (!isNaN(newDate.getTime())) {
                            setEventData(prev => ({ ...prev, endDate: newDate }));
                        }
                    }}
                />

                <CustomCheckbox
                    label="Everyone can join"
                    defaultValue={eventData.isOpen}
                    onChange={(e) => setEventData(prev => ({ ...prev, isOpen: e }))}
                />
                {eventData.startDate < new Date() ? (
                    <p className="error">Cant save: Start date must be in the future</p>
                ) : eventData.startDate > eventData.endDate ? (
                    <p className="error">Cant save: Start date must be before end date</p>
                ) : (
                    <div>
                        <button onClick={saveChanges}>Save changes</button>

                        <button onClick={fetchDeleteEvent}>Delete event</button>
                    </div>
                )}
            </div>

            {displayUsersInEvent()}

            <div>
                <h1>Invite people</h1>
                <CustomSearchBox
                    items={allUsers}
                    label="Search users"
                    defaultValueId={0}
                    onSelect={(id) => setUserToInvite(id)}
                />
                <button
                    onClick={inviteUser}>
                    Invite user
                </button>
            </div>

        </div>
    )
}

export default EventDetailsPanel