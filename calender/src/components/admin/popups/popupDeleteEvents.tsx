interface popupUserData {
  eventData: {
    id: number;
    title: string;
    description: string;
    roomId: number;
    date: string;
  };
  saveDeleteEvent: (eventData) => void;
}

const PopupDeleteEvents: React.FC<popupUserData> = ({ eventData, saveDeleteEvent }) => {

  const deleteUser = () => {
    saveDeleteEvent(eventData)
  }

  return (
    <div>
        <p>Are you sure that you wanna delete:</p>
        <p>ID: {eventData.id}</p>
        <p>Name: {eventData.title}</p>
      <br></br>
      <button onClick={deleteUser}>Delete</button>
    </div>
  );
};

export default PopupDeleteEvents;