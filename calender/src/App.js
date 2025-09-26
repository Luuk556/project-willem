import './App.css';
import './styling/style.css';
import Login from './screens/Login/Login.tsx';
import CalendarScreen from './screens/calendar/calendar-screen.tsx';
import AdminDashboard from './screens/admin/dashboard';
import Navbar from './components/navbar/navbar.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/calendar' element={<CalendarScreen />} />
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
