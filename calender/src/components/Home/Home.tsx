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

  // Load current attendance status when component mounts
  useEffect(() => {
    const loadAttendanceStatus = async () => {
      const userId = localStorage.getItem("userId");
      const currentUserId = userId ? parseInt(userId, 10) : 1;

      try {
        const response = await axios.get(`http://localhost:5184/api/attendance/today/${currentUserId}`);
        if (response.data) {
          setIsPresent(true);
          setSelectedRoomId(response.data.roomId);
        } else {
          setIsPresent(false);
          setSelectedRoomId("");
        }
      } catch (error) {
        setIsPresent(false);
        setSelectedRoomId("");
      }
    };

    loadAttendanceStatus();
  }, []);

  const handleAttendance = async () => {
    if (!isPresent && !selectedRoomId) return alert("Select a room first");
    
    const userId = localStorage.getItem("userId");
    const currentUserId = userId ? parseInt(userId, 10) : 1;

    try {
      if (isPresent) {
        // Sign off
        await axios.post(`http://localhost:5184/api/attendance/end?userId=${currentUserId}`);
        setIsPresent(false);
        setSelectedRoomId("");
      } else {
        // Sign in
        await axios.put('http://localhost:5184/api/attendance', {
          userId: currentUserId,
          roomId: selectedRoomId
        });
        setIsPresent(true);
      }
    } catch (error) {
      console.error("Attendance error:", error);
    }
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
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(Number(e.target.value))}
              >
                <option value="">Choose a room</option>
                {Array.from(rooms.entries()).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAttendance}
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