import React, { useState } from "react";
import NavbarCell from "./navbar-cell/navbar-cell.tsx";
import "./navbar.css"
import { Link } from 'react-router-dom';

interface Cell {
  linkTo: string | undefined;
  title: string;
  isHovering: boolean;
  isActive: boolean;
  subNavs?: {
    name: string;
    link: string;
  }[];
}

interface NavbarProps {
  onActiveChange?: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onActiveChange }) => {


  const [navbarCells, setNavbarCells] = useState<Map<number, Cell>>(
    new Map([
      [1, { title: "Home", isHovering: false, isActive: true, linkTo: "/home" }],
      [2, { title: "Calendar", isHovering: false, isActive: false, linkTo: "/calendar" }],
      [3, { title: "My events", isHovering: false, isActive: false, linkTo: "/my-events" }],
      [4, { title: "Rooms", isHovering: false, isActive: false, linkTo: "/rooms" }],
      [5, { title: "Register", isHovering: false, isActive: false, linkTo: "/register" }],
      [6, { title: "Logout", isHovering: false, isActive: false, linkTo: "/logout" }],
      [7, {
        title: "Admin", isHovering: false, isActive: false, linkTo: "#",
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
      {Array.from(navbarCells.entries()).map(([key, cell]) => (
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