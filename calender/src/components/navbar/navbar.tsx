import React, { useState } from "react";
import NavbarCell from "./navbar-cell/navbar-cell.tsx";
import "./navbar.css"

interface Cell {
    title: string;
    isHovering: boolean;
    isActive: boolean;
}

interface NavbarProps {
    onActiveChange?: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onActiveChange }) => {

    
    const [navbarCells, setNavbarCells] = useState<Map<number, Cell>>(
        new Map([
            [1, { title: "Home",     isHovering: false, isActive: true }],
            [2, { title: "Calendar", isHovering: false, isActive: false }],
            [3, { title: "Rooms",    isHovering: false, isActive: false }],
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
<div className="navbar-container">
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
      />
    </div>
  ))}
</div>
  );
};

export default Navbar;