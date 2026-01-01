import { useState } from "react";
import CustomInput from "../../inputs/CustomInput.tsx";

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
      <CustomInput
        label="Name:"
        type="text"
        onChange={e => { setRoomChanges({ ...roomChanges, name: e }) }}
        defaultValue={roomChanges.name}
      />

      <br></br>
      <CustomInput
        label="Capacity:"
        type="text"
        onChange={e => { setRoomChanges({ ...roomChanges, capacity: Number(e) }) }}
        defaultValue={roomChanges.capacity}
      />
      <br></br>
      <button onClick={changeRoom}>Save</button>
    </div>
  );
};

export default PopupRooms;