function AdminDashboard() {
    return (
        <div>
            <header class="header">
                <section class="home">
                    <div class="home__list">
                        <p className="home__list--item">Home</p>
                    </div>
                </section>
                <nav class="navigation">
                    <ul class="navigation__list">
                        <li class="navigation__list--item">Calendar</li>
                        <li class="navigation__list--item">Rooms</li>
                        <li class="navigation__list--item">Logout</li>
                    </ul>
                </nav>
            </header>

            <div class="admin">
                <div class="userlist">
                    <section class="dashboard-card">
                        <div class="card-h">
                            <div class="card-h__title">
                                <p className="card-h__title--text">Users</p>
                            </div>
                        </div>
                        <div class="card-b">
                            <div class="card-b__row">
                                <th class="card-b__row--title">Name</th>
                                <th class="card-b__row--title">Username</th>
                                <th class="card-b__row--title">E-mail</th>
                            </div>
                            <tr>
                                <td class="card-b__row--text">Airto</td>
                                <td class="card-b__row--text">Nene</td>
                                <td class="card-b__row--text">1080444@hr.nl</td>
                            </tr>
                        </div>
                    </section>

                    <section class="dashboard-card">
                        <div class="card-h">
                            <div class="card-h__title">
                                <p className="card-h__title--text">Rooms</p>
                            </div>
                        </div>
                        <table class="card-b">
                            <tr class="card-b__row">
                                <th class="card-b__row--title">Name</th>
                                <th class="card-b__row--title">Capacity</th>
                            </tr>
                            <tr>
                                <td class="card-b__row--text">Room 101</td>
                                <td class="card-b__row--text">20</td>
                                <td class="card-b__row--text">Edit</td>
                            </tr>
                        </table>
                    </section>

                    <section class="dashboard-card">
                        <div class="card-h">
                            <div class="card-h__title">
                                <p className="card-h__title--text">Events</p>
                            </div>
                        </div>
                        <table class="card-b">
                            <tr class="card-b__row">
                                <th class="card-b__row--title">Name</th>
                                <th class="card-b__row--title">Date</th>
                            </tr>
                            <tr>
                                <td class="card-b__row--text">Meeting</td>
                                <td class="card-b__row--text">16-09-2025</td>
                                <td class="card-b__row--text">Edit</td>
                            </tr>
                        </table>
                    </section>
                </div>
            </div>
        </div>
    );
}


export default AdminDashboard