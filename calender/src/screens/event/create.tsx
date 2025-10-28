import React, { useState } from "react"

const Profile: React.FC = () => {
    const mockdata = ["event title", "event info", "event description"]

    const [title, setTitle] = useState(mockdata[0])
    const [info, setInfo] = useState(mockdata[1])
    const [description, setDescription] = useState(mockdata[2])

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const event = {title, info, description}

        fetch('http://localhost:8000/event/create', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event)
        }).then(() => {
            console.log("Event created")
        })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label>Event Title</label>
                <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label>Event Information</label>
                <input
                type="text"
                required
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                />
                <br />
                <label>Event Description</label>
                <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <button className="submit-button">Submit Changes</button>
            </form>
        </div>
    )
}

export default Profile;