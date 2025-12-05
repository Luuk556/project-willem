import './App.css';
import './styling/style.scss';
import Login from './screens/Login/Login.tsx';
import CalendarScreen from './screens/calendar/calendar-screen.tsx';
import AdminRoomDashboard from './screens/admin/dashboard/room.tsx';
import Navbar from './components/navbar/navbar.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomMap from './screens/rooms/roomMap.tsx';
import Room from './screens/rooms/room.tsx';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/calendar' element={<CalendarScreen />} />
          <Route path="/" element={<Login />} />
          <Route path="/Admin/room-dashboard" element={<AdminRoomDashboard />} />
          <Route path="/rooms" element={<RoomMap />} />
          <Route path="/rooms/:id" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
