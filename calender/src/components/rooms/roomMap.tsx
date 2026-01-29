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
    const [roomsOob, setRoomsOob] = useState<RoomMap[]>([])

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

    function calculateMapBounds() {
        setRoomsOob([]);
        rooms.forEach(r => {
            if (r.positionX >= 100 || r.positionY >= 100 || r.positionX < 0 || r.positionY < 0) {
                console.log(r)
                setRoomsOob(prev => [...prev, r])
            }
        })
    }

    useEffect(() => {
        calculateMapBounds();
    }, [rooms]);

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
                        backgroundColor: `${room.isAvailable ? "rgb(136, 229, 128)" : /*"rgb(252, 125, 109)"*/ "rgb(136, 229, 128)"}`
                    }}
                >
                    {room.name || `Room ${room.id}`}
                </button>
            </Link>
        );
    }

    function displayRoomsOob() {
        return (
            <div className='roommap-header'>
                <p>Rooms not visible on map: </p>
                {roomsOob.map(r => (
                    <Link key={r.id} to={`/rooms/${r.id}`}> <button>{r.name}</button> </Link>
                ))}
            </div>
        )
    }

    return (
        <div className='roommap-container'>
            {roomsOob.length > 0 ? displayRoomsOob() : <></>}
            {rooms.map(placeRoom)}
        </div>
    );
};

export default RoomMap;