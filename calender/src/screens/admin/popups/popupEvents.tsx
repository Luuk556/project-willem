interface popupEventsData {
    eventData: {
        id?: number;
        name?: string;
        date?: string;
    };
}

const PopupEvents: React.FC<popupEventsData> = ({ eventData }) => {
  return (
    <div>
      <p>ID: {eventData.id}</p>
      <p>Name: {eventData.name}</p>
      <p>Date: {eventData.date}</p>
    </div>
  );
};

export default PopupEvents;