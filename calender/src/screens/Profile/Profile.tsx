import React, { ProfilerProps, useState } from "react"
import "./Profile.css"

const mockdata = ["username", "email", "password"]

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

function Profile() {

    const mockdata = ["kai", "kai@email", "secret", "https://media.gettyimages.com/id/1473893794/nl/foto/smiling-businessman-gesturing-against-blue-background.jpg?s=612x612&w=gi&k=20&c=yfxs87VpKNVd8MDJ8cXNt1k6jGjkMt1gKVtXNoUwn6o=", "blabalabalabiboibo"]

    const [editing, setEditing] = useState(false)
    const [username, setUsername] = useState(mockdata[0])
    const [email, setEmail] = useState(mockdata[1])
    const [password, setPassword] = useState(mockdata[2])
    const [img, setPicture] = useState(mockdata[3])
    const [bio, setBio] = useState(mockdata[4])

    const profileData = {username, email, password, img, bio}

    if (editing) {
        return (
        <div className="profile">
            <div>
            <label>
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={(e) => setPicture(e.target.value)}/>
                <img className="profile-picture" src={img} />
            </label>
            </div>
            <div className="profile-fields">
                <label>Username: </label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <label>Email: </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label>Bio: </label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            </div>
            <button className="submit-button" onClick={(e) => handleSubmit(e, profileData)}>Submit changes</button>
        </div>
        )
    }

    return (
    <div className="profile">
        <div>
            <label>
                <img className="profile-picture" src={img}></img> 
            </label>   
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
        <button className="edit-button" onClick={() => setEditing(true)}>Edit details</button>
    </div>
    )
}

export default function() {
    return (
        <div>
            <Profile></Profile>
        </div>
    )
};