import React from "react";
import "./navbar-cell.css"
import { Link } from 'react-router-dom';

interface NavbarCellProps {
  text?: string;
  isHovering?: boolean;
  isActive?: boolean;
  linkTo?: string;
}

const NavbarCell: React.FC<NavbarCellProps> = ({
  text = "",
  isHovering = false,
  isActive = false,
  linkTo = "/"
}) => {
  const indicatorClass = isActive
    ? "indicator indicator-active"
    : isHovering
      ? "indicator indicator-hovering"
      : "indicator indicator-default";
  return (
    <Link
      to={linkTo}
      className="navbar-cell-container"
    >
      <p className="navbar-cell-text">{text}</p>
      <div className={indicatorClass}></div>
    </Link>
  );
};

export default NavbarCell;