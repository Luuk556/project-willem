import { useEffect, useState } from "react";
import { EventDetails } from "../../data/datatypes/eventDatatypes"
import CustomInput from "../inputs/CustomInput.tsx";
import CustomCheckbox from "../inputs/CustomCheckbox.tsx";
import CustomSearchBox from "../inputs/CustomSearchBox.tsx";
import axios from "axios";

interface EventDetailsPanelProps {
    data: EventDetails;
}
const EventDetailsPanel: React.FC<EventDetailsPanelProps> = ({ data }) => {
    const [eventData, setEventData] = useState<EventDetails>(data)
    const [rooms, setRooms] = useState<Map<number, string>>(new Map())

    useEffect(() => {
        axios.get("http://localhost:5184/room/all")
            .then((res) => {
                let result: Map<number, string> = new Map;
                res.data.map((data: { id: number; name: string }) => {
                    result.set(data.id, data.name)
                })
                setRooms(result)
            })
            .catch((err) => {
                console.error("Could not retrieve rooms:", err);
            });
    }, []);

    const saveChanges = async () => {
        await axios.put(
            `http://localhost:5184/event/edit/${eventData.ID}`,
            {
                Id: eventData.ID,
                Title: eventData.title,
                Description: eventData.description,
                RoomId: eventData.roomId,
                StartDate: new Date(eventData.startDate),
                EndDate: new Date(eventData.endDate),
                IsOpen: eventData.isOpen
            },
        )
    }
    return (
        <div>
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
                defaultValueId={eventData.roomId}
                label="Select room"
                onSelect={(id) => setEventData(prev => ({ ...prev, roomId: id }))}
            />
            <CustomInput
                type="date"
                label="Start Date"
                defaultValue={eventData.startDate.toString().substring(0, 10)}
                onChange={(e) => setEventData(prev => ({ ...prev, startDate: new Date(e) }))}
            />
            <CustomInput
                type="date"
                label="End Date"
                defaultValue={eventData.endDate.toString().substring(0, 10)}
                onChange={(e) => setEventData(prev => ({ ...prev, endDate: new Date(e) }))}
            />
            <CustomCheckbox
                label="Everyone can join"
                defaultValue={eventData.isOpen.toString()}
                onChange={(e) => setEventData(prev => ({ ...prev, isOpen: e }))}
            />

            <button onClick={saveChanges}>Save changes</button>

        </div>
    )
}

export default EventDetailsPanel