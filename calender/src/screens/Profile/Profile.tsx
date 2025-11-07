import React, { ProfilerProps, useState } from "react"
import "./Profile.css"


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
                    <div className="profile-card">
            <div className="profile-header">
                <label>
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={(e) => setPicture(e.target.value)}/>
                <img className="profile-pic" src={img} />
            </label>
              <div>
                <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <p className="profile-role">Student Developer</p>
              </div>
            </div>
            <div className="profile-info">
              <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
              <p>Project: Project Willem</p>
            </div>
            <button
              onClick={(e) => handleSubmit(e, profileData)}
              className="btn-green"
            > Submit
            </button>
          </div>
        
        )
    }

    return (
        <div className="profile-card">
            <div className="profile-header">
              <img
                src={img}
                alt="Profile image"
                className="profile-pic"
              />
              <div>
                <h3 className="profile-name">{username}</h3>
                <p className="profile-role">Student Developer</p>
              </div>
            </div>
            <div className="profile-info">
              <p>{email}</p>
              <p>Project: Project Willem</p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="btn-green"
            > Edit
            </button>
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