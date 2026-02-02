import { FC, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Popup from "../popups/popup.tsx";
import PopupUpdateEvents from "../popups/popupUpdateEvents.tsx";
import PopupDeleteEvents from "../popups/popupDeleteEvents.tsx";
import CustomInput from "../../inputs/CustomInput.tsx";
import { getAllEvents } from "../../../services/eventService.ts";

interface EventsDetails {
    id: number;
    title: string;
    description: string;
    roomId: number;
    date: string;
}

interface popupDetails {
    update?: EventsDetails;
    delete?: EventsDetails;
}

const AdminEventDashboard: FC = () => {
    const [events, setEvents] = useState<EventsDetails[]>([]);
    const [popup, setPopup] = useState<popupDetails>({});
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

    const eventDeletes = (eventDelete: EventsDetails) => {
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:5184/event/delete/${eventDelete.id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setEvents(() =>
                events.filter(event => event.id !== eventDelete.id)
            );
        })
        setPopup({})
    }

    return (
        <main className="admin">
            <Popup closePopup={() => setPopup({})} openPopup={popup} >
                { popup.update ? (
                    <PopupUpdateEvents eventData={popup.update} saveEventChanges={eventChanges} />
                ) : popup.delete ? (
                    <PopupDeleteEvents eventData={popup.delete} saveDeleteEvent={eventDeletes} />
                ) : null }
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
                    <div className="dashboard-card__table-row dashboard-card__table-row--header" style={{ ["--row-count" as any]: 3 }}>
                        <p>Name</p>
                        <p>Edit</p>
                        <p>Delete</p>
                    </div>
                    {filterList().map((event: EventsDetails) => (
                        <div key={event.id} className="dashboard-card__table-row" style={{ ["--row-count" as any]: 3 }}>
                            <p>{event.title}</p>
                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => { setPopup({update: event}) }}/>
                            <FontAwesomeIcon icon={faTrash} onClick={() => {setPopup({delete: event})}}/>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
};

export default AdminEventDashboard