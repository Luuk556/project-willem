import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../../data/datatypes/roomDatatypes';
import RoomList from '../../data/RoomData.ts';
import EventList from '../../data/EventData.ts';

const RoomMap: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()))
    const roomList = RoomList;
    const eventData = EventList;
    const rooms: Array<Room> = roomList.getAllRooms();
    function getIsAvailable(roomID: number): boolean {
        let events = eventData.getEventsByRoom(roomID)
        console.log(selectedDate)
        console.log(events)
        for (const event of events) {
            if (event.roomID === roomID) {
                if (event.startDate < selectedDate) {
                    if (new Date(event.startDate.getTime() + event.duration * 60 * 1000) > selectedDate) {
                        console.log(event)
                        return false
                    }
                }
            }
        }
        return true
    }
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
                        backgroundColor: `${getIsAvailable(room.id) ? "green" : "darkred"}`
                    }}
                >
                    {room.name || `Room ${room.id}`}
                </button>
            </Link>
        );
    }

    return (
        <div className='roommap-container'>
            <input
                type="datetime-local"
                onChange={e => {
                    const selectedDate = e.target.value;
                    if (selectedDate) {
                        setSelectedDate(new Date(selectedDate));
                    }
                }} />
            {rooms.map(placeRoom)}
        </div>
    );
};

export default RoomMap;