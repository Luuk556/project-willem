import './App.css';
import './styling/style.scss';
import Navbar from './components/navbar/navbar.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.tsx';
import Login from './components/profile/Login.tsx';
import CalendarScreen from './components/calendar/calendar-screen.tsx'
import AdminRoomDashboard from './components/admin/dashboard/room.tsx';
import RoomMap from './components/rooms/roomMap.tsx';
import Room from './components/rooms/room.tsx';
import Profile from './components/profile/Profile.tsx';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/calendar' element={<CalendarScreen />} />
          <Route path="/" element={<Login />} />
          <Route path="/Admin/room-dashboard" element={<AdminRoomDashboard />} />
          <Route path="/rooms" element={<RoomMap />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
