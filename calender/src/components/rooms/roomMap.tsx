import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../../data/datatypes/roomDatatypes';
import CustomInput from '../inputs/CustomInput.tsx';
import { getRoomMapDetails } from '../../services/roomService.ts';

interface RoomMap extends Room {
    isAvailable: boolean;
}

const RoomMap: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()))
    const [rooms, setRooms] = useState<RoomMap[]>([])

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomMapData = await getRoomMapDetails(selectedDate)

                setRooms(roomMapData);
            } catch (err) {
                console.error("Failed to fetch rooms:", err);
            }
        };

        fetchRooms();
    }, [selectedDate]);

    function placeRoom(room: RoomMap) {
        return (
            <Link to={`/rooms/${room.id}`}>
                <button
                    key={room.id}
                    className='room-button'
                    style={{
                        top: `${room.positionY}vh`,
                        left: `${room.positionX}vw`,
                        height: `${room.sizeY}vh`,
                        width: `${room.sizeX}vw`,
                        backgroundColor: `${room.isAvailable ? "rgb(136, 229, 128)" : "rgb(252, 125, 109)"}`
                    }}
                >
                    {room.name || `Room ${room.id}`}
                </button>
            </Link>
        );
    }

    return (
        <div className='roommap-container'>
            <CustomInput
                type="datetime-local"
                label="Select date:"
                onChange={selectedDate => { setSelectedDate(new Date(selectedDate)); }}
                defaultValue={""}
            />
            {rooms.map(placeRoom)}
        </div>
    );
};

export default RoomMap;