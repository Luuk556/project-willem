import React, { ProfilerProps, useState } from "react"
import "./Profile.css"

const mockdata = ["username", "email", "password"]

interface EditprofileProps {
    oldusername: string,
    oldemail: string,
    oldpassword: string,
    oldimg: string,
    oldbio: string,
}

interface profileProps {
    username: string,
    email: string,
    password: string,
    img: string,
    bio: string,
}

const handleSubmit = (e: any, profileData: {}) => {
    e.preventDefault()

    fetch('http://localhost:8000/profile', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData)
    }).then(() => {
        console.log("Profile data updated")
    })
}


function ProfileEdit({oldusername, oldemail, oldpassword, oldimg, oldbio}: EditprofileProps) {

    const [username, setUsername] = useState(oldusername)
    const [email, setEmail] = useState(oldemail)
    const [password, setPassword] = useState(oldpassword)
    const [img, setPicture] = useState(oldimg)
    const [bio, setBio] = useState(oldbio)

    const profileData = {username, email, password, img}
    return (
        <div className="profile">
            <form onSubmit={(event) => handleSubmit(event, profileData)}>
                <label>Username</label>
                <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label>Email</label>
                <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>Password</label>
                <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button className="submit-button">Submit Changes</button>
            </form>
        </div>
    )
}

function Profile({username, email, password, img, bio}: profileProps) {
    const [editing, setEditing] = useState(false)

    const editProfileView = <div>
                            <ProfileEdit oldusername={username} oldemail={email} oldpassword={password} oldimg={img} oldbio={bio}></ProfileEdit>
                            </div>
    var profileView = <div className="profile">
        <h1 className="profile-field">Username: {username}</h1>
        <h1 className="profile-field">Email: {email}</h1>
        <h1 className="profile-field">Password: {password}</h1>
        <h1 className="profile-field">Bio: {bio}</h1>
        <button onClick={(event) => setEditing(true)}>Edit</button>
    </div>

    if (editing) {
        profileView = editProfileView
    }

    return (
        <div>
            {profileView}
        </div>
    )
}

export default function() {
    return (
        <div>
            <Profile username="kai" email="kai@gmail.com" password="secret" img="" bio="hellooorrr"></Profile>
        </div>
    )
};