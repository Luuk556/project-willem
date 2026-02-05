import './App.css';
import './styling/style.scss';
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
import EventManagementScreen from './components/events/EventManagementScreen.tsx';
import EventInvites from './components/events/EventInvites.tsx';
import Register from './components/profile/Register.tsx';
import CreateEvent from './components/events/create_event.tsx';
import Logout from './components/profile/Logout.tsx';

// Middleware
import MiddlewareUser from './components/middleware/MiddlewareUser.tsx';
import MiddlewareAdmin from './components/middleware/MiddlewareAdmin.tsx';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<MiddlewareUser />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/my-events" element={<EventManagementScreen />} />
            <Route path="/invitations" element={<EventInvites />} />
            <Route path='/calendar' element={<CalendarScreen />} />
            <Route path="/rooms" element={<RoomMap />} />
            <Route path="/rooms/:id" element={<Room />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/event/create" element={<CreateEvent />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin" element={<MiddlewareAdmin />}>
              <Route path="room-dashboard" element={<AdminRoomDashboard />} />
              <Route path="event-dashboard" element={<AdminEventDashboard />} />
              <Route path="user-dashboard" element={<AdminUserDashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
