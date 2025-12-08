import { FC, useState, useEffect } from "react";
import Popup from "../popups/popup.tsx";
import PopupRooms from "../popups/popupEvents.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PopupEvents from "../popups/popupEvents.tsx";

interface EventsDetails {
    id: number;
    title: string;
    date: string;
}

interface popupDetails {
    event?: Object;
};

const AdminDashboard: FC = () => {
    const [events, setEvents] = useState<EventsDetails[]>([]);
    const [popup, setPopup] = useState<popupDetails>({});
    const [search, setSearch] = useState({ event: "" });

    useEffect(() => {
        axios.get("http://localhost:5184/event/all")
            .then(req => {
                console.log(req.data)
                setEvents(req.data);
            })
            .catch(err => console.error(err));
    }, []);

    const eventChanges = (roomChanges: Object, id: Number) => {
        setEvents(events =>
            events.map(oldEvent =>
                (oldEvent.id === id) ? { ...oldEvent, ...roomChanges } : oldEvent
            )
        );
        setPopup({})
    };

    const filterList = (list: Array<EventsDetails>, input_text: string) => {
        if (input_text === "") return list
        const filterd_list = list.filter((event) =>
            event.title.toLowerCase().startsWith(input_text.toLowerCase())
        )
        return ((filterd_list.length) ? filterd_list : [])
    }

return (
<main className="admin">
    <Popup closePopup={() => setPopup({})} openPopup={popup} >
        {popup.event ? (
            <PopupEvents eventData={popup.event} saveEventChanges={eventChanges} />
        ) : null}
    </Popup>

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
                    <div className="card-b__col card-b__header" style={{ ["--row-count" as any]: 2 }}>
                        <p className="card-b__header--title">Title</p>
                        <p className="card-b__header--title">Edit</p>
                    </div>
                    <div className="scrollbar">
                        {filterList(events, search.event).map((event) => (
                            <div key={event.id} className="card-b__col card-b__row" style={{ ["--row-count" as any]: 2 }}>
                                <p className="card-b__row--text">{ event.title }</p>
                                <p  onClick={() => {setPopup({event: event})}} className="card-b__row--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
</main>
);
};

export default AdminDashboard