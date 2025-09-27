import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

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

interface MeetingDetails {
    id: number;
    name: string;
    date: string;
}

function AdminDashboard() {
    const users: Userdetails[] = [
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
            name: "Pieter",
            username: "Works",
            email: "Pieter@ziggo.com"
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
    ];

    const rooms: RoomDetails[] = [
        {
            id: 1,
            name: "Room 101",
            capacity: 40,
        },
        {
            id: 2,
            name: "Room 102",
            capacity: 20,
        }
    ];

    const Meetings: MeetingDetails[] = [
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
    ];

    return (
        <div>
            <header className="header">
                <section className="home">
                    <div className="home__list">
                        <p className="home__list--item">Home</p>
                    </div>
                </section>
                <nav className="navigation">
                    <ul className="navigation__list">
                        <li className="navigation__list--item">Calendar</li>
                        <li className="navigation__list--item">Rooms</li>
                        <li className="navigation__list--item">Logout</li>
                    </ul>
                </nav>
            </header>

            <div className="admin">

                <div className="userlist">
                    <section className="dashboard-card">
                        <div className="card-h">
                            <div className="card-h__title">
                                <p className="card-h__title--text">Users</p>
                            </div>
                        </div>

                        <div className="card-b">
                            <div className="card-b__col card-b__header" style={{ ["--row-count" as any]: 4 }}>
                                <p className="card-b__header--title">Name</p>
                                <p className="card-b__header--title">Username</p>
                                <p className="card-b__header--title">Mail</p>
                                <p className="card-b__header--title">Edit</p>
                            </div>
                            {users.map((user) => (
                                <div key={user.id} className="card-b__col card-b__row" style={{ ["--row-count" as any]: 4 }}>
                                    <p className="card-b__row--text">{ user.name }</p>
                                    <p className="card-b__row--text">{ user.username }</p>
                                    <p className="card-b__row--text">{ user.email }</p>
                                    <p className="card-b__row--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="dashboard-card">
                        <div className="card-h">
                            <div className="card-h__title">
                                <p className="card-h__title--text">Rooms</p>
                            </div>
                        </div>

                        <div className="card-b">
                            <div className="card-b__col card-b__header" style={{ ["--row-count" as any]: 3 }}>
                                <p className="card-b__header--title">Name</p>
                                <p className="card-b__header--title">Capacity</p>
                                <p className="card-b__header--title">Edit</p>
                            </div>
                            <div className="scrollbar">
                                {rooms.map((room) => (
                                    <div key={room.id} className="card-b__col card-b__row" style={{ ["--row-count" as any]: 3 }}>
                                        <p className="card-b__row--text">{ room.name }</p>
                                        <p className="card-b__row--text">{ room.capacity }</p>
                                        <p className="card-b__row--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
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
                        </div>

                        <div className="card-b">
                            <div className="card-b__col card-b__header" style={{ ["--row-count" as any]: 3 }}>
                                <p className="card-b__header--title">Name</p>
                                <p className="card-b__header--title">Date</p>
                                <p className="card-b__header--title">Edit</p>
                            </div>
                            <div className="scrollbar">
                                {Meetings.map((meeting) => (
                                    <div key={meeting.id} className="card-b__col card-b__row" style={{ ["--row-count" as any]: 3 }}>
                                        <p className="card-b__row--text">{ meeting.name }</p>
                                        <p className="card-b__row--text">{ meeting.date }</p>
                                        <p className="card-b__row--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}


export default AdminDashboard