import { useState } from "react";

interface popupEventData {
    eventData: {
        id?: number;
        title?: string;
        date?: string;
    };
    saveEventChanges: (changedData: { name: string, date: string }, id: Number) => void;
}

interface changeEventData {
  title: string;
  date: string;
}

const PopupEvents: React.FC<popupEventData> = ({ eventData, saveEventChanges }) => {

  const [eventChanges, setEventChanges] = useState<changeEventData>({
    title: eventData.title || "",
    date: eventData.date || "",
  })

  const changeEvent = () => {
    if (eventData.id !== undefined) saveEventChanges(eventChanges, eventData.id)
  }


  return (
    <div>
      <p>ID: {eventData.id}</p>
      <label>Name: </label>
      <input type="text" value={eventChanges.title} onChange={e => {setEventChanges({...eventChanges, title: e.target.value })}} />
      <br></br>
      <label>Date: </label>
      <input type="text" value={eventChanges.date} onChange={e => {setEventChanges({...eventChanges, date: e.target.value })}}/>
      <br></br>
      <button onClick={changeEvent}>Save</button>
    </div>
  );
};

export default PopupEvents;