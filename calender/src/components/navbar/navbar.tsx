import React, { useState, useEffect } from "react";
import NavbarCell from "./navbar-cell/navbar-cell.tsx";
import "./navbar.css"
import { Link } from 'react-router-dom';

interface Cell {
  linkTo: string | undefined;
  title: string;
  isHovering: boolean;
  isActive: boolean;
  role: number;
  subNavs?: {
    name: string;
    link: string;
  }[];
}

interface NavbarProps {
  onActiveChange?: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onActiveChange }) => {
  const [userRole, setUserRole] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8080/api/profile/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((req) => req.json())
      .then((data) => {
        setUserRole(data.role)
      })
      .catch((err) => console.error("Failed to fetch profile:", err));

  }, []);

  const [navbarCells, setNavbarCells] = useState<Map<number, Cell>>(
    new Map([
      [1, { title: "Home", isHovering: false, isActive: true, linkTo: "/home", role: 0 }],
      [2, { title: "Calendar", isHovering: false, isActive: false, linkTo: "/calendar", role: 0 }],
      [3, { title: "My events", isHovering: false, isActive: false, linkTo: "/my-events", role: 0 }],
      [4, { title: "invitations", isHovering: false, isActive: false, linkTo: "/invitations", role: 0 }],
      [5, { title: "Rooms", isHovering: false, isActive: false, linkTo: "/rooms", role: 0 }],
      [7, { title: "Logout", isHovering: false, isActive: false, linkTo: "/logout", role: 0 }],
      [8, {
        title: "Admin", isHovering: false, isActive: false, linkTo: "#", role: 1,
        subNavs: [
          { name: "Users", link: "/Admin/user-dashboard" },
          { name: "Rooms", link: "/Admin/room-dashboard" },
          { name: "Events", link: "/Admin/event-dashboard" },
        ]
      }],
    ])
  );
  const setHover = (index: number, state: boolean) => {
    setNavbarCells((previous) => {
      const newMap = new Map(previous);
      const cell = newMap.get(index);
      if (cell) {
        newMap.set(index, { ...cell, isHovering: state })
      }
      return newMap;

    })
  }

  const setActiveCell = (index: number) => {
    setNavbarCells((prev) => {
      const newMap = new Map();
      prev.forEach((cell, key) => {
        newMap.set(key, { ...cell, isActive: key === index });
      });
      return newMap;
    });
    if (onActiveChange) {
      onActiveChange(index);
    };
  };

  return (
    <header className="navbar-container">
      {Array.from(navbarCells.entries()).filter(([key, cell]) => cell.role <= userRole).map(([key, cell]) => (
        <div
          key={key}
          onMouseEnter={() => setHover(key, true)}
          onMouseLeave={() => setHover(key, false)}
          onClick={() => setActiveCell(key)}
          style={{ cursor: "pointer" }}
        >
          <NavbarCell
            text={cell.title}
            isHovering={cell.isHovering}
            isActive={cell.isActive}
            linkTo={cell.linkTo}

          />
          {cell.subNavs && (
            <div className="subNav" style={{ display: cell.isHovering ? "flex" : "none" }}>
              {cell.subNavs.map((subNav, subIndex) => (
                <Link key={subIndex} to={subNav.link} className="subNav-link">{subNav.name}</Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </header>
  );
};

export default Navbar;