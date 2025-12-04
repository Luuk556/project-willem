import React, { useState } from "react";
import "../Home/Home.scss";
import Calendar from "../../components/calendar/calendar.tsx";

const Home: React.FC = () => {
  const [attendees, setAttendees] = useState(5);
  const [isPresent, setIsPresent] = useState(false);

  const handleAttendance = () => {
    if (isPresent) {
      setAttendees(attendees - 1);
    } else {
      setAttendees(attendees + 1);
    }
    setIsPresent(!isPresent);
  };

  const weekEvents = [
    { day: "Monday", event: "Team meeting" },
    { day: "Tuesday", event: "Workshop React" },
    { day: "Wednesday", event: "Day off" },
    { day: "Thursday", event: "Sprint planning" },
    { day: "Friday", event: "Demo" },
  ];

  const openEvents = ["React Meetup", "Design session", "Code review"];

  return (
    <div className="home-container">
      <div className="columns">
        <div className="left-column">
          <div className="profile-card">
            <div className="profile-header">
              <img
                src="https://via.placeholder.com/60"
                alt="Profile image"
                className="profile-pic"
              />
              <Calendar selectedDate={new Date(Date.now())} dateAmount={1} isCompact={true}></Calendar>
              <div>
                  <Calendar selectedDate={new Date(Date.now())} dateAmount={1} isCompact={true}></Calendar>
                <h3 className="profile-name">Redwan Ettalby</h3>
                <p className="profile-role">Student Developer</p>
              </div>
            </div>
            <div className="profile-info">
              <p>Email: 1036282@hr.nl</p>
              <p>Project: Project Willem</p>
            </div>
          </div>

          <div className="attendance-card">
            <h2>Attendance</h2>
            <p>Amount present: {attendees}</p>
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
              {weekEvents.map((e) => (
                <li key={e.day}>
                  <p>{e.day}</p>
                  <p className="event-name">{e.event}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="open-events-card">
            <h2>Open events today</h2>
            <ul>
              {openEvents.map((event, i) => (
                <li key={i}>{event}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;