import { FC, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Popup from "../popups/popup.tsx";
import PopupRooms from "../popups/popupRooms.tsx";

interface RoomDetails {
    id: number;
    name: string;
    capacity: number;
    sizeX: number;
    sizeY: number;
    positionX: number;
    positionY: number;
}

interface popupDetails {
    room?: Object;
};

const AdminRoomDashboard: FC = () => {
    const [rooms, setRooms] = useState<RoomDetails[]>([]);
    const [popup, setPopup] = useState<popupDetails>({});
    const [search, setSearch] = useState({room: ""});

    useEffect(() => {
        axios.get("http://localhost:5184/room/all-full")
            .then(req => {
                setRooms(req.data);
            })
            .catch(err => console.error(err));
    }, []);

    const filterList = (list: RoomDetails, input_text: string) => {
        if(input_text === "") return list
        const filterd_list = list.filter((room: RoomDetails) =>
            room.name.toLowerCase().startsWith(input_text.toLowerCase())
        )
        return ((filterd_list.length) ? filterd_list : [])
    }

    const roomChanges = (roomChanges: RoomDetails) => {
        axios.put(`http://localhost:5184/room/edit/${roomChanges.id}`, roomChanges)
        .then(() => {
            setRooms(rooms =>
                rooms.map(oldRoom =>
                    (oldRoom.id === roomChanges.id) ? { ...oldRoom, ...roomChanges } : oldRoom
                )
            );
        })
        setPopup({})
    }

    return (
    <main className="admin">
        <Popup closePopup={() => setPopup({})} openPopup={popup} >
        { popup ? (
            <PopupRooms roomData={popup} saveRoomChanges={roomChanges} />
        ): null}
        </Popup>
        <section className="dashboard-card">
            <p className="dashboard-card__title">Rooms</p>
            <input
                type="text"
                className="dashboard-card__search"
                placeholder="Search Room"
                onChange={search => {setSearch(room => ({...room, room: search.target.value.trim()}))}}
            />
            <div className="dashboard-card__table">
                <div className="dashboard-card__table-row dashboard-card__table-row--header" style={{ ["--row-count" as any]: 3 }}>
                    <p>Name</p>
                    <p>Capacity</p>
                    <p>Edit</p>
                </div>
                {filterList(rooms, search.room).map((room: RoomDetails) => (
                    <div key={room.id} className="dashboard-card__table-row" style={{ ["--row-count" as any]: 3 }}>
                        <p>{ room.name }</p>
                        <p>{ room.capacity }</p>
                        <p onClick={() => {setPopup(room)}}><FontAwesomeIcon icon={faPenToSquare} /></p>
                    </div>
                ))}
            </div>
        </section>
    </main>
    )
}

export default AdminRoomDashboard