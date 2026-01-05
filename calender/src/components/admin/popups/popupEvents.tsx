import { useState } from "react";
import CustomInput from "../../inputs/CustomInput.tsx";

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

const PopupEvents: React.FC<popupEventData> = ({ eventData, saveEventChanges }) => {
  const [eventChanges, setEventChanges] = useState<popupEventData["eventData"]>({
    id: eventData.id,
    title: eventData.title,
    description: eventData.description,
    roomId: eventData.roomId,
    date: eventData.date,
  })

  const changeEvent = () => {
    saveEventChanges(eventChanges)
  }

  return (
    <div>
      <p>ID: {eventData.id}</p>

      <CustomInput
        label="Title:"
        type="text"
        onChange={e => { setEventChanges({ ...eventChanges, title: e }) }}
        defaultValue={eventChanges.title}
      />

      <CustomInput
        label="Description:"
        type="text"
        onChange={e => { setEventChanges({ ...eventChanges, description: e }) }}
        defaultValue={eventChanges.description}
      />

      <br></br>
      <button onClick={changeEvent}>Save</button>
    </div>
  );
};

export default PopupEvents;