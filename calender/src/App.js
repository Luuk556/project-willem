import './App.css';
import './styling/style.scss';
import Navbar from './components/navbar/navbar.tsx';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Home from './components/Home/Home.tsx';
import Login from './components/profile/Login.tsx';
import CalendarScreen from './components/calendar/calendar-screen.tsx'
import AdminRoomDashboard from './components/admin/dashboard/room.tsx';
import AdminEventDashboard from './components/admin/dashboard/event.tsx';
import AdminUserDashboard from './components/admin/dashboard/user.tsx';
import RoomMap from './components/rooms/roomMap.tsx';
import Room from './components/rooms/room.tsx';
import Profile from './components/profile/Profile.tsx';
import Register from './components/profile/Register.tsx';
import CreateEvent from './components/events/create_event.tsx';
import Logout from './components/profile/Logout.tsx';

function isLoggedIn() {
  return (localStorage.getItem("token") != null)
}

function App() {
  const token = localStorage.getItem("token")
  if (!token) {
    return <BrowserRouter><Routes><Route path="/login" element={<Login />} /></Routes></BrowserRouter>
  }
  
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path='/calendar' element={<CalendarScreen />} />
          <Route path="/" element={<Login />} />
          <Route path="/Admin/room-dashboard" element={<AdminRoomDashboard />} />
          <Route path="/Admin/event-dashboard" element={<AdminEventDashboard />} />
          <Route path="/Admin/user-dashboard" element={<AdminUserDashboard />} />
          <Route path="/rooms" element={<RoomMap />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event/create" element={<CreateEvent />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
