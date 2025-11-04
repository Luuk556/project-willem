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

        <div>
            <img className="profile-picture" src={img}></img>    
        </div>

            <form className="profile-fields" onSubmit={(event) => handleSubmit(event, profileData)}>
                <label>Username</label>
                <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <label>Bio</label>
                <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <label>Choose a profile picture:</label>
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={(e) => setPicture(e.target.value)}/>
            </form>
            <div>
                <button className="submit-button">Submit Changes</button>
            </div>
        </div>
    )
}

function Profile({username, email, password, img, bio}: profileProps) {
    const [editing, setEditing] = useState(false)

    const editProfileView = <div>
        <ProfileEdit oldusername={username} oldemail={email} oldpassword={password} oldimg={img} oldbio={bio}></ProfileEdit>
    </div>

    var profileView = <div className="profile">
        <div>
            <img className="profile-picture" src={img}></img>    
        </div>
        <div className="profile-fields">
            <label>Username: </label>
            <input value={username} readOnly></input>
            <label>Email: </label>
            <input value={email} readOnly></input>
            <label>Password: </label>
            <input type="password" value={password} readOnly></input>
            <label>Bio: </label>
            <textarea value={bio} readOnly></textarea>
        </div>
        <div>
            <button className="edit-button" onClick={() => setEditing(true)}>Edit details</button>
        </div>
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
            <Profile username="kai" email="kai@gmail.com" password="secret" img="https://media.gettyimages.com/id/1473893794/nl/foto/smiling-businessman-gesturing-against-blue-background.jpg?s=612x612&w=gi&k=20&c=yfxs87VpKNVd8MDJ8cXNt1k6jGjkMt1gKVtXNoUwn6o=" bio="biobiobiobiobiobiobibobobibobibobibobibobibobibobibobibo"></Profile>
        </div>
    )
};