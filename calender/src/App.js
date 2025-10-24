import logo from './logo.svg';
import './App.css';
import './styling/style.css';
import Login from './screens/Login/Login.tsx';
import AdminDashboard from './screens/admin/dashboard.tsx';
import Navbar from './components/navbar/navbar.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomMap from './screens/rooms/roomMap.tsx';
import Room from './screens/rooms/room.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/rooms" element={<RoomMap />} />
          <Route path="/rooms/:id" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
