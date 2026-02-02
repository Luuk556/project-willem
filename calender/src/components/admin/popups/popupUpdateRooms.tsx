import { useState } from "react";
import CustomInput from "../../inputs/CustomInput.tsx";

interface popupRoomData {
    roomData: {
        id: number;
        name: string;
        capacity: number;
        positionX: number;
        positionY: number;
        sizeX: number;
        sizeY: number;
    };
    saveRoomChanges: (roomData) => void;
}

const PopupUpdateRooms: React.FC<popupRoomData> = ({ roomData, saveRoomChanges }) => {
  const [roomChanges, setRoomChanges] = useState<popupRoomData["roomData"]>({
    id: roomData.id,
    name: roomData.name,
    capacity: roomData.capacity,
    positionX: roomData.positionX,
    positionY: roomData.positionY,
    sizeX: roomData.sizeX,
    sizeY: roomData.sizeY,
  })

  const changeRoom = () => {
    saveRoomChanges(roomChanges)
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

      <CustomInput
        label="Capacity:"
        type="text"
        onChange={e => { setRoomChanges({ ...roomChanges, capacity: Number(e) }) }}
        defaultValue={roomChanges.capacity}
      />

      <CustomInput
        label="Position X:"
        type="text"
        onChange={e => { setRoomChanges({ ...roomChanges, positionX: Number(e) }) }}
        defaultValue={roomChanges.positionX}
      />

      <CustomInput
        label="Position Y:"
        type="text"
        onChange={e => { setRoomChanges({ ...roomChanges, positionY: Number(e) }) }}
        defaultValue={roomChanges.positionY}
      />

      <CustomInput
        label="Size X:"
        type="text"
        onChange={e => { setRoomChanges({ ...roomChanges, sizeX: Number(e) }) }}
        defaultValue={roomChanges.sizeX}
      />

      <CustomInput
        label="Size Y:"
        type="text"
        onChange={e => { setRoomChanges({ ...roomChanges, sizeY: Number(e) }) }}
        defaultValue={roomChanges.sizeY}
      />

      <br></br>
      <button onClick={changeRoom}>Save</button>
    </div>
  );
};

export default PopupUpdateRooms;