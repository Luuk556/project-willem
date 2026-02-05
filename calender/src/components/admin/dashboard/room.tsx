import { FC, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Popup from "../popups/popup.tsx";
import PopupUdateRooms from "../popups/popupUpdateRooms.tsx";
import CustomInput from "../../inputs/CustomInput.tsx";

interface RoomDetails {
    id: number;
    name: string;
    capacity: number;
    sizeX: number;
    sizeY: number;
    positionX: number;
    positionY: number;
}

const AdminRoomDashboard: FC = () => {
    const [rooms, setRooms] = useState<RoomDetails[]>([]);
    const [popup, setPopup] = useState({});
    const [search, setSearch] = useState<String>("");

    useEffect(() => {
        axios.get("http://localhost:8080/room/all-full")
            .then(req => {
                setRooms(req.data);
            })
            .catch(err => console.error(err));
    }, []);


    const filterList = () => {
        if (search === "") return rooms
        const filterd_list = rooms.filter((room) =>
            room.name.toLowerCase().startsWith(search.toLowerCase())
        )
        return (filterd_list)
    }


    const roomChanges = (roomChanges: RoomDetails) => {
        axios.put(`http://localhost:8080/room/edit/${roomChanges.id}`, roomChanges)
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
                {popup ? (
                    <PopupUdateRooms roomData={popup} saveRoomChanges={roomChanges} />
                ) : null}
            </Popup>
            <section className="dashboard-card">
                <p className="dashboard-card__title">Rooms</p>
                <CustomInput
                    type="text"
                    label="Search rooms"
                    defaultValue={search}
                    onChange={result => { setSearch(result) }}
                />
                <div className="dashboard-card__table">
                    <div className="dashboard-card__table-row dashboard-card__table-row--header" style={{ ["--row-count" as any]: 3 }}>
                        <p>Name</p>
                        <p>Capacity</p>
                        <p>Edit</p>
                    </div>
                    {filterList().map((room: RoomDetails) => (
                        <div key={room.id} className="dashboard-card__table-row" style={{ ["--row-count" as any]: 3 }}>
                            <p>{room.name}</p>
                            <p>{room.capacity}</p>
                            <p onClick={() => { setPopup(room) }}><FontAwesomeIcon icon={faPenToSquare} /></p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default AdminRoomDashboard