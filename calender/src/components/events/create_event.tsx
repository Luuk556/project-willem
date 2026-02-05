import React, { useState, useEffect } from "react";
import './create.css';

interface Room {
  id: number;
  name: string;
}

const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState("Event Title");
  const [roomId, setRoomId] = useState<number | null>(null);
  const [description, setDescription] = useState("Event Description");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);

  // Fetch all rooms from backend
  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_IP}:8080/room/all`)
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        if (data.length > 0) setRoomId(data[0].id); // default to first room
      })
      .catch(err => console.error("Failed to fetch rooms:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!roomId) return alert("Please select a room");

    const event = {
      title,
      roomId,
      description,
      startDate,
      endDate,
      startTime,
      endTime
    };

    try {
      const res = await fetch(`http://${process.env.REACT_APP_IP}:8080/event/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(event)
      });

      if (res.ok) {
        console.log("Event created successfully!");
        alert("Event created!");
      } else if (res.status === 401) {
        alert("Unauthorized! Please login.");
      } else {
        const error = await res.text();
        alert("Error creating event: " + error);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error, check console.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>Event Title</label>
        <input type="text" required value={title} onChange={e => setTitle(e.target.value)} />

        <label>Event Location</label>
        <select
          value={roomId ?? ""}
          onChange={e => setRoomId(Number(e.target.value))}
        >
          {rooms.map(room => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>

        <label>Event Date</label>
        <input type="date" onChange={e => setStartDate(e.target.value)} />{" > "}
        <input type="date" onChange={e => setEndDate(e.target.value)} />

        <label>Event Time</label>
        <input type="time" onChange={e => setStartTime(e.target.value)} />{" > "}
        <input type="time" onChange={e => setEndTime(e.target.value)} />

        <label>Event Description</label>
        <textarea required value={description} onChange={e => setDescription(e.target.value)} />

        <button type="submit" className="btn-green">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
