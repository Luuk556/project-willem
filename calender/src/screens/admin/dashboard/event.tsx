import { FC, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Popup from "../popups/popup.tsx";
import PopupEvents from "../popups/popupEvents.tsx";

interface EventsDetails {
    id: number;
    title: string;
    date: string;
}

interface popupDetails {
    event?: Object;
};

const AdminEventDashboard: FC = () => {
    const [events, setEvents] = useState<EventsDetails[]>([]);
    const [popup, setPopup] = useState<popupDetails>({});
    const [search, setSearch] = useState({event: ""});

    useEffect(() => {
        axios.get("http://localhost:5184/event/all")
            .then(req => {
                setEvents(req.data);
            })
            .catch(err => console.error(err));
    }, []);

    const filterList = (list: EventsDetails, input_text: string) => {
        if(input_text === "") return list
        const filterd_list = list.filter((event: EventsDetails) =>
            event.title.toLowerCase().startsWith(input_text.toLowerCase())
        )
        return ((filterd_list.length) ? filterd_list : [])
    }

    const eventChanges = (eventChanges: EventsDetails) => {
        console.log(eventChanges)
        axios.put(`http://localhost:5184/event/edit/${eventChanges.id}`, eventChanges)
        .then(() => {
            setEvents(events =>
                events.map(oldEvent =>
                    (oldEvent.id === eventChanges.id) ? { ...oldEvent, ...eventChanges } : oldEvent
                )
            );
        })
        setPopup({})
    };

    return (
        <main className="admin">
            <Popup closePopup={() => setPopup({})} openPopup={popup} >
                {popup ? (
                    <PopupEvents eventData={popup} saveEventChanges={eventChanges} />
                ) : null}
            </Popup>
            <section className="dashboard-card">
                <p className="dashboard-card__title">Events</p>
                <input
                    type="text"
                    className="dashboard-card__search"
                    placeholder="Search Room"
                    onChange={search => {setSearch(event => ({...event, event: search.target.value.trim()}))}}
                />
                <div className="dashboard-card__table">
                    <div className="dashboard-card__table-row dashboard-card__table-row--header" style={{ ["--row-count" as any]: 2 }}>
                        <p>Name</p>
                        <p>Edit</p>
                    </div>
                    {filterList(events, search.event).map((event: EventsDetails) => (
                        <div key={event.id} className="dashboard-card__table-row" style={{ ["--row-count" as any]: 2 }}>
                            <p>{ event.title }</p>
                            <p onClick={() => {setPopup(event)}}><FontAwesomeIcon icon={faPenToSquare} /></p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
};

export default AdminEventDashboard