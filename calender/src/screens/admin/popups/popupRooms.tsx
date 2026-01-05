import { useState } from "react";

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

const PopupRooms: React.FC<popupRoomData> = ({ roomData, saveRoomChanges }) => {
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
    console.log(roomChanges)
    saveRoomChanges(roomChanges)
  }


  return (
    <div>
      <label>Name: </label>
      <input type="text" value={roomChanges.name} onChange={e => {setRoomChanges({...roomChanges, name: e.target.value })}} />
      <br></br>
      <label>Capasity: </label>
      <input type="number" value={roomChanges.capacity} onChange={e => {setRoomChanges({...roomChanges, capacity: Number(e.target.value) })}}/>
      <br></br>
      <label>Position X: </label>
      <input type="number" value={roomChanges.positionX} onChange={e => {setRoomChanges({...roomChanges, positionX: Number(e.target.value) })}}/>
      <br></br>
      <label>Position Y: </label>
      <input type="number" value={roomChanges.positionY} onChange={e => {setRoomChanges({...roomChanges, positionY: Number(e.target.value) })}}/>
      <br></br>
      <label>Size X: </label>
      <input type="number" value={roomChanges.sizeX} onChange={e => {setRoomChanges({...roomChanges, sizeX: Number(e.target.value) })}}/>
      <br></br>
      <label>Size Y: </label>
      <input type="number" value={roomChanges.sizeY} onChange={e => {setRoomChanges({...roomChanges, sizeY: Number(e.target.value) })}}/>
      <br></br>
      <button onClick={changeRoom}>Save</button>
    </div>
  );
};

export default PopupRooms;