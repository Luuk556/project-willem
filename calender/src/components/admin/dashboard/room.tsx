import { FC, useState, useEffect } from "react";
import Popup from "../popups/popup.tsx";
import PopupRooms from "../popups/popupRooms.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface RoomDetails {
    id: number;
    name: string;
    capacity: number;
}

interface popupDetails {
    user?: Object;
    room?: Object;
    event?: Object;
};

const AdminRoomDashboard: FC = () => {
    const [rooms, setRooms] = useState<RoomDetails[]>([]);
    const [popup, setPopup] = useState<popupDetails>({});
    const [search, setSearch] = useState({ room: "" });

    useEffect(() => {
        axios.get("http://localhost:5184/room/all-full")
            .then(req => {
                setRooms(req.data);
            })
            .catch(err => console.error(err));
    }, []);


    const roomChanges = (roomChanges: Object, id: Number) => {
        setRooms(rooms =>
            rooms.map(oldRoom =>
                (oldRoom.id === id) ? { ...oldRoom, ...roomChanges } : oldRoom
            )
        );
        setPopup({})
    };

    const filterList = (list: Array<RoomDetails>, input_text: string) => {
        if (input_text === "") return list
        const filterd_list = list.filter((room) =>
            room.name.toLowerCase().startsWith(input_text.toLowerCase())
        )
        return ((filterd_list.length) ? filterd_list : [])
    }

    return (
        <main className="admin">
            <Popup closePopup={() => setPopup({})} openPopup={popup} >
                {popup.room ? (
                    <PopupRooms roomData={popup.room} saveRoomChanges={roomChanges} />
                ) : null}
            </Popup>

            <section className="dashboard-card">
                <div className="card-h">
                    <div className="card-h__title">
                        <p className="card-h__title--text">Rooms</p>
                    </div>
                    <div className="card-h__search">
                        <input
                            type="text"
                            className="card-h__search--input"
                            placeholder="Search Room"
                            onChange={search => { setSearch(room => ({ ...room, room: search.target.value.trim() })) }}
                        />
                    </div>
                </div>
                <div className="card-b">
                    <div className="card-b__col card-b__header" style={{ ["--row-count" as any]: 3 }}>
                        <p className="card-b__header--title">Name</p>
                        <p className="card-b__header--title">Capacity</p>
                        <p className="card-b__header--title">Edit</p>
                    </div>
                    <div className="scrollbar">
                        {filterList(rooms, search.room).map((room) => (
                            <div key={room.id} className="card-b__col card-b__row" style={{ ["--row-count" as any]: 3 }}>
                                <p className="card-b__row--text">{room.name}</p>
                                <p className="card-b__row--text">{room.capacity}</p>
                                <p onClick={() => { setPopup({ room: room }) }} className="card-b__row--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
};

export default AdminRoomDashboard