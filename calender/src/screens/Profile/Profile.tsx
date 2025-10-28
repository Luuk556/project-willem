import React, { useState } from "react"
import "./Profile.css"

const Profile: React.FC = () => {
    const mockdata = ["username", "email", "password"]

    const [username, setUsername] = useState(mockdata[0])
    const [email, setEmail] = useState(mockdata[1])
    const [password, setPassword] = useState(mockdata[2])

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const profile = {username, email, password}

        fetch('http://localhost:8000/profile', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile)
        }).then(() => {
            console.log("Profile data updated")
        })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
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

export default Profile;