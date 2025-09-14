import React from "react";
import "./navbar-cell.css"

interface NavbarCellProps {
  text?: string;
  isHovering?: boolean;
  isActive?: boolean;
}

const NavbarCell: React.FC<NavbarCellProps> = ({
  text = "",
  isHovering = false,
  isActive = false,
}) => {
  const indicatorClass = isActive
    ? "indicator indicator-active"
    : isHovering
    ? "indicator indicator-hovering"
    : "indicator indicator-default";
  return (
    <div className="navbar-cell-container">
      <p className="navbar-cell-text">{text}</p>
      <div className={indicatorClass}></div>
    </div>
  );
};

export default NavbarCell;