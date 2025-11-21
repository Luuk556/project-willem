import React, { useState } from "react"
import './create.css'

const CreateEvent: React.FC = () => {
    const mockdata = ["event title", "event info", "event description"]

    const [title, setTitle] = useState(mockdata[0])
    const [roomId, setRoomId] = useState(mockdata[1])
    const [description, setDescription] = useState(mockdata[2])
    const [startDate, setStartDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endDate, setEndDate] = useState("")
    const [endTime, setEndTime] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const event = {title, roomId, description, startDate, endDate, startTime, endTime}

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
                <label>Event Location</label>
                <select name="rooms" onChange={(e) => setRoomId(e.target.value)}>
                    <option value="101">Room 101</option>
                    <option value="102">Room 102</option>
                    <option value="103">Room 103</option>
                    <option value="104">Room 104</option>
                </select>
                <label>Event Date</label>
                <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                />
                {">"}
                <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                />
                <label>Event Time</label>
                <input
                type="time"
                onChange={(e) => setStartTime(e.target.value)}
                />
                {">"}
                <input
                type="time"
                onChange={(e) => setEndTime(e.target.value)}
                />
                <label>Event Description</label>
                <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </form>
            <button onClick={(e) => handleSubmit(e)} className="btn-green">Create Event</button>
        </div>
    )
}

export default CreateEvent;