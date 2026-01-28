import { FC, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Popup from "../popups/popup.tsx";
import PopupUsers from "../popups/popupUsers.tsx";
import CustomInput from "../../inputs/CustomInput.tsx";

interface UserDetails {
    id: number;
    name: string;
    email: string;
    biography: string;
    role: number;
}

const AdminUserDashboard: FC = () => {
    const [users, setUsers] = useState<UserDetails[]>([]);
    const [popup, setPopup] = useState({});
    const [search, setSearch] = useState<String>("");

    useEffect(() => {
        axios.get("http://localhost:5184/api/user")
            .then(req => {
                setUsers(req.data);
            })
            .catch(err => console.error(err));
    }, []);


    const filterList = () => {
        if (search === "") return users
        const filterd_list = users.filter((user) =>
            user.name.toLowerCase().startsWith(search.toLowerCase())
        )
        return (filterd_list)
    }


    const userChanges = (userChanges: UserDetails) => {
        axios.put(`http://localhost:5184/api/user/${userChanges.id}`, userChanges)
        .then(() => {
            setUsers(users =>
                users.map(oldUser =>
                    (oldUser.id === userChanges.id) ? { ...oldUser, ...userChanges } : oldUser
                )
            );
        })
        setPopup({})
    }

    return (
    <main className="admin">
        <Popup closePopup={() => setPopup({})} openPopup={popup} >
        { popup ? (
            <PopupUsers userData={popup} saveUserChanges={userChanges} />
        ): null}
        </Popup>
        <section className="dashboard-card">
            <p className="dashboard-card__title">Users</p>
            <CustomInput
                type="text"
                label="Search users"
                defaultValue={search}
                onChange={result => { setSearch(result) }}
            />
            <div className="dashboard-card__table">
                <div className="dashboard-card__table-row dashboard-card__table-row--header" style={{ ["--row-count" as any]: 4 }}>
                    <p>Name</p>
                    <p>Email</p>
                    <p>Edit</p>
                    <p>Delete</p>
                </div>
                {filterList().map((user: UserDetails) => (
                    <div key={user.id} className="dashboard-card__table-row" style={{ ["--row-count" as any]: 4 }}>
                        <p>{ user.name }</p>
                        <p>{ user.email }</p>
                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => {setPopup(user)}}/>
                        { user.role === 0 ? (
                            <FontAwesomeIcon icon={faTrash} onClick={() => {setPopup(user)}}/>
                        ) : (
                            <p></p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    </main>
    )
}

export default AdminUserDashboard