import React, { useState, useEffect, use } from "react";
import axios from "axios";
import Calendar from "../calendar/calendar.tsx";
import Profile from "../../components/profile/Profile.tsx";
import { Room } from "../../data/datatypes/roomDatatypes";
import { getAllRooms } from "../../services/roomService.ts";
import { endAttendance, getTodayAttendance, isUserPresentInRoom, updateAttendance } from "../../services/Attendance.ts";
import { update } from "immutable";

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
    const loadAttendanceStatus = async () => {
      try {
        const response = await getTodayAttendance();
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

  useEffect(() => {
    const checkUserPresence = async () => {
      if (selectedRoomId === "") return;
      try {
        const present = await isUserPresentInRoom(selectedRoomId as number);
        setIsPresent(present);
      } catch (error) {
        console.error("Error checking presence:", error);
      }
    };

    checkUserPresence();
  }, [selectedRoomId]);

  const handleAttendance = async () => {
    if (!isPresent && !selectedRoomId) return alert("Select a room first");
    try {
      if (isPresent) {
        // Sign off
        await endAttendance();
        setIsPresent(false);
        setSelectedRoomId("");
      } else {
        // Sign in
        await updateAttendance(selectedRoomId as number);
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
            <p>Events today</p>
            <Calendar
              isCompact={true}
              dateAmount={1}
              selectedDate={new Date()}
              onlyOpenEvents={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;