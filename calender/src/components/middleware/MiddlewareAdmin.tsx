import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const MiddlewareAdmin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:5184/api/profile/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((req) => req.json())
        .then((user) => {
            (user.role === 1) ? setIsAdmin(true) : setIsAdmin(false)
            console.log(user.role)
        })
        .catch((err) => console.error("Failed to fetch profile:", err));
    }, [token])
    if (isAdmin === null) return <div>Loading...</div>;
    return (isAdmin) ? <Outlet/> : <Navigate to="/Home" replace/>
}

export default MiddlewareAdmin;