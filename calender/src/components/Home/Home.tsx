import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "../calendar/calendar.tsx";
import Profile from "../../components/profile/Profile.tsx";
import { Room } from "../../data/datatypes/roomDatatypes";
import { getAllRooms } from "../../services/roomService.ts";

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<Map<number, string>>(new Map);
  const [selectedRoomId, setSelectedRoomId] = useState<number | "">("");
  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      const allRooms = await getAllRooms();
      setRooms(allRooms);
    }

    fetchRooms();
  }, []);

  useEffect(() => {
    const updateAttendance = () => {

      if (isPresent) {
        axios.put('http://localhost:8080/api/attendance', {
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
        axios.post('http://localhost:8080/api/attendance/end', {
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

            <div className="custom-dropdown">
              <label className="dropdown-width">Select a room</label>
              <select
                defaultValue={selectedRoomId}
                onChange={(e) => setSelectedRoomId(Number(e.target.value))}
              >
                {Array.from(rooms.entries()).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

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