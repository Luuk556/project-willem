import React, { useState } from "react";
import "./navbar-cell.css"
import { Link } from 'react-router-dom';
import Cell from "../../NavbarCellprops";

const NavbarCell: React.FC<Cell> = ({
  id = 0,
  title = "",
  isActive = false,
  linkTo = "/",
  setIsActive
}) => {

  const [isHovering, setIsHovering] = useState(false)
  return (
    <Link
      to={linkTo}
      className="navbar-cell-container"
      onClick={() => setIsActive(id)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false) }}
    >
      <p className="navbar-cell-text">{title}</p>
      <div className={isActive ? "indicator indicator-active" : isHovering ? "indicator indicator-hover" : "indicator indicator-inactive"}></div>
    </Link>
  );
};

export default NavbarCell;