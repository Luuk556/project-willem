import React from "react";
import "./App.css";
import Login from "./screens/Login/Login";
import CalendarScreen from "./screens/Calendar/calendar-screen/calendar-screen";
import Navbar from "./components/navbar/navbar.tsx";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="app-body">
          <Login />
      </div>
    </div>
  );
};

export default App;
