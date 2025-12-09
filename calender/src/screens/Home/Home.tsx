import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "../../components/calendar/calendar.tsx";
import Profile from "../../components/profile/Profile.tsx";
import { Room } from "../../data/datatypes/roomDatatypes";

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

  useEffect(() => {
    const updateAttendance = () => {

      if (isPresent) {
        axios.put('http://localhost:5184/api/attendance', {
          userId: 1,
          roomId: selectedRoomId
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios.post('http://localhost:5184/api/attendance/end', {
          userId: 1
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    };

    updateAttendance();
  }, [isPresent]);

  const handleAttendance = () => {
    if (!selectedRoomId) return alert("Select a room first");
    setIsPresent(!isPresent);
  }

  return (
    <div className="home-container">
      <div className="columns">
        <div className="left-column">
          <Profile />
          <div className="attendance-card" style={{ marginTop: "20px" }}>
            <h2>Attendance</h2>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(Number(e.target.value))}
            >
              <option value="">Choose a room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleAttendance()}
              className={isPresent ? "btn red" : "btn green"}
            >
              {isPresent ? "Sign off" : "Sign in"}
            </button>
          </div>
        </div>

        <div className="calendars">
          <div className="homescreen-calendar">
            <p>My events today</p>
            <Calendar
              isCompact={true}
              dateAmount={1}
              selectedDate={new Date(2025, 9, 4)}
              onlyOpenEvents={false}
            />
          </div>

          <div className="homescreen-calendar">
            <p>Open events today</p>
            <Calendar
              isCompact={true}
              dateAmount={1}
              selectedDate={new Date(2025, 9, 4)}
              onlyOpenEvents={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;