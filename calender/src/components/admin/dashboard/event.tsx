import { FC, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Popup from "../popups/popup.tsx";
import PopupEvents from "../popups/popupEvents.tsx";
import CustomInput from "../../inputs/CustomInput.tsx";
import { getAllEvents } from "../../../services/eventService.ts";

interface EventsDetails {
    id: number;
    title: string;
    date: string;
}

const AdminEventDashboard: FC = () => {
    const [events, setEvents] = useState<EventsDetails[]>([]);
    const [popup, setPopup] = useState({});
    const [search, setSearch] = useState<String>("");

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {

                const response = await getAllEvents();
                setEvents(response)
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchAllEvents()
    }, []);

    const filterList = () => {
        if (search === "") return events
        const filterd_list = events.filter((event) =>
            event.title.toLowerCase().startsWith(search.toLowerCase())
        )
        return (filterd_list)
    }

    const eventChanges = (eventChanges: EventsDetails) => {
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
                <CustomInput
                    type="text"
                    label="Search Events"
                    defaultValue={search}
                    onChange={result => { setSearch(result) }}
                />
                <div className="dashboard-card__table">
                    <div className="dashboard-card__table-row dashboard-card__table-row--header" style={{ ["--row-count" as any]: 2 }}>
                        <p>Name</p>
                        <p>Edit</p>
                    </div>
                    {filterList().map((event: EventsDetails) => (
                        <div key={event.id} className="dashboard-card__table-row" style={{ ["--row-count" as any]: 2 }}>
                            <p>{event.title}</p>
                            <p onClick={() => { setPopup(event) }}><FontAwesomeIcon icon={faPenToSquare} /></p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
};

export default AdminEventDashboard