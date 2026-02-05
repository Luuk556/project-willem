import Navbar from '../navbar/navbar.tsx';
import { Navigate, Outlet } from "react-router-dom";

const MiddlewareUser = () => {
    const userToken = localStorage.getItem("token");
    return (userToken) ? <><Navbar /><Outlet /></> : <Navigate to="/Login" replace/>
}

export default MiddlewareUser;