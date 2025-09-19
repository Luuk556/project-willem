import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function AdminDashboard() {
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
                            <div className="card-b__header">
                                <p className="card-b__header--title">Name</p>
                                <p className="card-b__header--title">Username</p>
                                <p className="card-b__header--title">Mail</p>
                                <p className="card-b__header--title">Edit</p>
                            </div>
                            <div className="card-b__body">
                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">wim</p>
                                    <p className="card-b__body--text">willem</p>
                                    <p className="card-b__body--text">wim@ziggo.nl</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Peter</p>
                                    <p className="card-b__body--text">Pan</p>
                                    <p className="card-b__body--text">peter@ziggo.nl</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="dashboard-card">
                        <div className="card-h">
                            <div className="card-h__title">
                                <p className="card-h__title--text">Rooms</p>
                            </div>
                        </div>

                        <div className="card-b">
                            <div className="card-b__header">
                                <p className="card-b__header--title">Name</p>
                                <p className="card-b__header--title">Capacity</p>
                                <p className="card-b__header--title">Edit</p>
                            </div>
                            <div className="card-b__body">
                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Room 101</p>
                                    <p className="card-b__body--text">20</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Room 102</p>
                                    <p className="card-b__body--text">40</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
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
                            <div className="card-b__header">
                                <p className="card-b__header--title">Name</p>
                                <p className="card-b__header--title">Date</p>
                                <p className="card-b__header--title">Edit</p>
                            </div>
                            <div className="card-b__body">
                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Meeting</p>
                                    <p className="card-b__body--text">18-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Sprint meeting</p>
                                    <p className="card-b__body--text">19-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Meeting</p>
                                    <p className="card-b__body--text">18-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Sprint meeting</p>
                                    <p className="card-b__body--text">19-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Meeting</p>
                                    <p className="card-b__body--text">18-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Sprint meeting</p>
                                    <p className="card-b__body--text">19-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Meeting</p>
                                    <p className="card-b__body--text">18-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Sprint meeting</p>
                                    <p className="card-b__body--text">19-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Meeting</p>
                                    <p className="card-b__body--text">18-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Sprint meeting</p>
                                    <p className="card-b__body--text">19-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Meeting</p>
                                    <p className="card-b__body--text">18-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Sprint meeting</p>
                                    <p className="card-b__body--text">19-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Meeting</p>
                                    <p className="card-b__body--text">18-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                                <div className="card-b__body--row">
                                    <p className="card-b__body--text">Sprint meeting</p>
                                    <p className="card-b__body--text">19-09-2025</p>
                                    <p className="card-b__body--text"><FontAwesomeIcon icon={faPenToSquare} /></p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}


export default AdminDashboard