import { useState } from "react";

interface popupRoomData {
    roomData: {
        id?: number;
        name?: string;
        capacity?: number;
    };
    saveRoomChanges: (changedData: { name: string, capacity: number }, id: Number) => void;
}

interface changeRoomData {
  name: string;
  capacity: number;
}

const PopupRooms: React.FC<popupRoomData> = ({ roomData, saveRoomChanges }) => {

  const [roomChanges, setRoomChanges] = useState<changeRoomData>({
    name: roomData.name || "",
    capacity: roomData.capacity || 0,
  })

  const changeRoom = () => {
    if (roomData.id !== undefined) saveRoomChanges(roomChanges, roomData.id)
  }


  return (
    <div>
      <p>ID: {roomData.id}</p>
      <label>Name: </label>
      <input type="text" value={roomChanges.name} onChange={e => {setRoomChanges({...roomChanges, name: e.target.value })}} />
      <br></br>
      <label>Capasity: </label>
      <input type="text" value={roomChanges.capacity} onChange={e => {setRoomChanges({...roomChanges, capacity: Number(e.target.value) })}}/>
      <br></br>
      <button onClick={changeRoom}>Save</button>
    </div>
  );
};

export default PopupRooms;