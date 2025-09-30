import React, { useState } from "react";
import NavbarCell from "./navbar-cell/navbar-cell.tsx";
import "./navbar.css"
import Cell from "../NavbarCellprops.ts";


const Navbar: React.FC = () => {
  const [activeCell, setActiveCell] = useState(0)
  const navbarCells: Omit<Cell, "isActive" | "setIsActive">[] = [
    { id: 0, title: "home", linkTo: "/home" },
    { id: 1, title: "calendar", linkTo: "/calendar" },
    { id: 2, title: "rooms", linkTo: "/rooms" },
    { id: 3, title: "login", linkTo: "/login" },
    { id: 4, title: "admin", linkTo: "/admin" },
  ];
  return (
    <div className="navbar-container">
      {navbarCells.map((cell) => (
        <NavbarCell key={cell.linkTo}
          id={cell.id}
          linkTo={cell.linkTo}
          title={cell.title}
          isActive={cell.id === activeCell}
          setIsActive={setActiveCell} />
      ))}
    </div>
  );
};

export default Navbar;