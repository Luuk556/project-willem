import { FC, useState, useEffect } from "react";
import Popup from "./popups/popup.tsx";
import PopupUsers from "./popups/popupUsers.tsx";
import PopupRooms from "./popups/popupRooms.tsx";
import PopupEvents from "./popups/popupEvents.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface Userdetails {
    id: number;
    name: string;
    username: string;
    email: string;
}

interface RoomDetails {
    id: number;
    name: string;
    capacity: number;
}

interface EventDetails {
    id: number;
    name: string;
    date: string;
}

interface popupDetails {
    user?: Object;
    room?: Object;
    event?: Object;
};

const AdminDashboard: FC = () => {
const [users, setUsers] = useState<Userdetails[]>([
    {
        id: 1,
        name: "Peter",
        username: "Pan",
        email: "peter@ziggo.com"
    },
    {
        id: 2,
        name: "Pieter",
        username: "Works",
        email: "Pieter@ziggo.com"
    },
    {
        id: 3,
        name: "Pieter",
        username: "Works",
        email: "Pieter@ziggo.com"
    },
    {
        id: 4,
        name: "Jantje",
        username: "Brakel",
        email: "jantje@ziggo.com"
    },
    {
        id: 5,
        name: "Pieter",
        username: "Works",
        email: "Pieter@ziggo.com"
    },
    {
        id: 6,
        name: "Pieter",
        username: "Works",
        email: "Pieter@ziggo.com"
    },
    {
        id: 7,
        name: "Peter",
        username: "Pan",
        email: "peter@ziggo.com"
    },
]);

const [rooms, setRooms] = useState<RoomDetails[]>([]);
useEffect(() => {
    axios.get("http://localhost:5184/api/Rooms")
    .then(res => {
        setRooms(res.data);
    })
    .catch(err => console.error(err));
}, []);

const [events, setEvents] = useState<EventDetails[]>([
    {
        id: 1,
        name: "Meeting",
        date: "18-09-2025",
    },
    {
        id: 2,
        name: "Project Update",
        date: "18-10-2025",
    }
]);

const [popup, setPopup] = useState<popupDetails>({});

const userChanges = (userChanges: Object, id: Number) => {
    setUsers(users =>
        users.map(oldUser =>
            (oldUser.id === id) ? { ...oldUser, ...userChanges } : oldUser
        )
    );
    setPopup({})
};

const roomChanges = (roomChanges: Object, id: Number) => {
    setRooms(rooms =>
        rooms.map(oldRoom =>
            (oldRoom.id === id) ? { ...oldRoom, ...roomChanges } : oldRoom
        )
    );
    setPopup({})
};

const eventChanges = (roomChanges: Object, id: Number) => {
    setEvents(events =>
        events.map(oldEvent =>
            (oldEvent.id === id) ? { ...oldEvent, ...roomChanges } : oldEvent
        )
    );
    setPopup({})
};

const [search, setSearch] = useState({user: "", room: "", event: ""});
const filterList = (list: Object, input_text: string) => {
    if(input_text === "") return list
    const filterd_list = list.filter((room: RoomDetails) =>
        room.name.toLowerCase().startsWith(input_text.toLowerCase())
    )
    return ((filterd_list.length) ? filterd_list : [])
}

return (
<main>
    <Popup closePopup={() => setPopup({})} openPopup={popup} >
    { popup.user ? (
        <PopupUsers userData={popup.user} saveUserChanges={userChanges}  />
    ) : popup.room ? (
        <PopupRooms roomData={popup.room} saveRoomChanges={roomChanges} />
    ) : popup.event ? (
        <PopupEvents eventData={popup.event} saveEventChanges={eventChanges} />
    ): null}
    </Popup>

    <div className="admin">
        <div className="userlist">
            <section className="dashboard-card">
                <div className="card-h">
                    <div className="card-h__title">
                        <p className="card-h__title--text">Users</p>
                    </div>
                    <div className="card-h__search">
                        <input
                            type="text"
                            className="card-h__search--input"
                            placeholder="Search user"
                            onChange={search => {setSearch(user => ({...user, user: search.target.value.trim()}))}}
                        />
                    </div>
                </div>
                <div className="card-b">
                    <div className="card-b__col card-b__header" style={{ ["--row-count" as any]: 4 }}>
                        <p className="card-b__header--title">Name</p>
                        <p className="card-b__header--title">Username</p>
                        <p className="card-b__header--title">Mail</p>
                        <p className="card-b__header--title">Edit</p>
                    </div>
                    {filterList(users, search.user).map((user) => (
                        <div key={user.id} className="card-b__col card-b__row" style={{ ["--row-count" as any]: 4 }}>
                            <p className="card-b__row--text">{ user.name }</p>
                            <p className="card-b__row--text">{ user.username }</p>
                            <p className="card-b__row--text">{ user.email }</p>
                            <p onClick={() => {setPopup({user: user})}} className="card-b__row--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                        </div>
                    ))}
                </div>
            </section>

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
                            onChange={search => {setSearch(room => ({...room, room: search.target.value.trim()}))}}
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
                                <p className="card-b__row--text">{ room.name }</p>
                                <p className="card-b__row--text">{ room.capacity }</p>
                                <p onClick={() => {setPopup({room: room})}} className="card-b__row--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="dashboard-card">
                <div className="card-h">
                    <div className="card-h__title">
                        <p className="card-h__title--text">Events</p>
                    </div>
                    <div className="card-h__search">
                        <input
                            type="text"
                            className="card-h__search--input"
                            placeholder="Search events"
                            onChange={search => {setSearch(event => ({...event, event: search.target.value.trim()}))}}
                        />
                    </div>
                </div>
                <div className="card-b">
                    <div className="card-b__col card-b__header" style={{ ["--row-count" as any]: 3 }}>
                        <p className="card-b__header--title">Name</p>
                        <p className="card-b__header--title">Date</p>
                        <p className="card-b__header--title">Edit</p>
                    </div>
                    <div className="scrollbar">
                        {filterList(events, search.event).map((event) => (
                            <div key={event.id} className="card-b__col card-b__row" style={{ ["--row-count" as any]: 3 }}>
                                <p className="card-b__row--text">{ event.name }</p>
                                <p className="card-b__row--text">{ event.date }</p>
                                <p  onClick={() => {setPopup({event: event})}} className="card-b__row--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    </div>
</main>
);
};

export default AdminDashboard