import axios from "axios";
import { useState, useEffect } from "react";

interface popupEventData {
  eventData: {
    id: number;
    title: string;
    description: string;
    roomId: number;
    date: string;
  };
  saveEventChanges: (changedData: { name: string, date: string, id: Number }) => void;
}

interface roomData {
  id: number;
  name: string;
}

const PopupEvents: React.FC<popupEventData> = ({ eventData, saveEventChanges }) => {
  const [eventChanges, setEventChanges] = useState<popupEventData["eventData"]>({
    id: eventData.id,
    title: eventData.title,
    description: eventData.description,
    roomId: eventData.roomId,
    date: eventData.date,
  })
  const [rooms, setRooms] = useState<roomData[]>([])
  useEffect(() => {
    axios.get("http://localhost:5184/room/all")
    .then(req => {
      setRooms(req.data);
    })
  }, []);

  const changeEvent = () => {
    saveEventChanges(eventChanges)
  }

  return (
    <div>
      <p>ID: {eventData.id}</p>
      <label>Name: </label>
      <input type="text" value={eventChanges.title} onChange={e => {setEventChanges({...eventChanges, title: e.target.value })}}/>
      <br></br>
      <label>Description: </label>
      <input type="text" value={eventChanges.description} onChange={e => {setEventChanges({...eventChanges, description: e.target.value })}}/>
      <br></br>
      <label>Room: </label>
      <select value={eventData.roomId} onChange={e => setEventChanges({...eventChanges, roomId: Number(e.target.value)})}>
        {rooms.map((room) => (
          <option value={room.id}>{room.name}</option>
        ))}
      </select>
      <br></br>
      <label>Date: </label>
      <input type="text" value={eventChanges.date} onChange={e => {setEventChanges({...eventChanges, date: e.target.value })}}/>
      <br></br>
      <button onClick={changeEvent}>Save</button>
    </div>
  );
};

export default PopupEvents;