import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../../data/datatypes/roomDatatypes';
import axios from 'axios';
import CustomInput from '../inputs/CustomInput.tsx';

interface RoomMap extends Room {
    isAvailable: boolean;
}

const RoomMap: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()))
    const [rooms, setRooms] = useState<RoomMap[]>([])

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get<RoomMap[]>("http://localhost:5184/room/map", {
                    params: {
                        date: selectedDate
                    }
                });

                setRooms(response.data);
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
                        backgroundColor: `${room.isAvailable ? "green" : "darkred"}`
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