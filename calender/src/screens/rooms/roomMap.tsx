import React from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../../data/datatypes/roomDatatypes';
import RoomList from '../../data/RoomData.ts';



const RoomMap: React.FC = () => {
    const roomList = RoomList
    const rooms: Array<Room> = roomList.getAllRooms();
    function placeRoom(room: Room) {
        return (
            <Link to={`/rooms/${room.id}`}>
                <button
                    key={room.id}
                    className='room-button'
                    style={{
                        top: `${room.posY}vh`,
                        left: `${room.posX}vw`,
                        height: `${room.sizeY}vh`,
                        width: `${room.sizeX}vw`,
                    }}
                >
                    {room.name || `Room ${room.id}`}
                </button>
            </Link>
        );
    }

    return (
        <div className='roommap-container'>
            {rooms.map(placeRoom)}
        </div>
    );
};

export default RoomMap;