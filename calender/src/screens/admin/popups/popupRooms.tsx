interface popupRoomsData {
    roomData: {
        id?: number;
        name?: string;
        capacity?: number;
    };
}

const PopupUsers: React.FC<popupRoomsData> = ({ roomData }) => {
  return (
    <div>
      <p>ID: {roomData.id}</p>
      <p>Name: {roomData.name}</p>
      <p>Capacity: {roomData.capacity}</p>
    </div>
  );
};

export default PopupUsers;