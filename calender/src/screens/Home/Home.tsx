import React, { useState, useEffect } from "react";
import axios from "axios";

interface Room {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number | "">("");
  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5184/room/all")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Rooms fout:", err));
  }, []);

  const handleAttendance = () => {
    if (!selectedRoomId) return alert("Select a room first");
    axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

    // TODO: Hier kun je POST/PUT request naar AttendanceController toevoegen
    setIsPresent(!isPresent);
  };

  return (
    <div className="home-container">
      <div className="columns">
        <div className="left-column">
          <div className="attendance-card">
            <h2>Attendance</h2>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(Number(e.target.value))}
            >
              <option value="">-- Choose a room --</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAttendance}
              className={isPresent ? "btn red" : "btn green"}
            >
              {isPresent ? "Sign off" : "Sign in"}
            </button>
          </div>
        </div>

        <div className="right-column">
          <div className="calendar-card">
            <h2>Event calender (this week)</h2>
            <ul>
              <li>Monday - Team meeting</li>
              <li>Tuesday - Workshop React</li>
              <li>Wednesday - Day off</li>
              <li>Thursday - Sprint planning</li>
              <li>Friday - Demo</li>
            </ul>
          </div>

          <div className="open-events-card">
            <h2>Open events today</h2>
            <ul>
              <li>React Meetup</li>
              <li>Design session</li>
              <li>Code review</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;