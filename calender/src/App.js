import logo from './logo.svg';
import './App.css';
import './styling/style.css';
import Login from './screens/Login/Login.tsx';
import Hello_world from './screens/Login/hello_world.tsx';
import AdminDashboard from './screens/admin/dashboard.tsx';
import Navbar from './components/navbar/navbar.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/hello_world" element={<Hello_world />} />
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
