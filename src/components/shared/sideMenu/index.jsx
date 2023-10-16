import React from "react";
import { NavLink } from "react-router-dom";
import { routepath } from "../../../constants/routepath";

const SideMenu = () => {
  return (
    <div className="left" style={{height:'100vh'}}>
      <div className="company">
        <div className="logo">
          <img src="../../../src/assets/images/zeapp-logo.png" alt="main" />
        </div>
      </div>
      <div className="navigation">
        <ul>
          <li>
            <NavLink
              to={routepath.dashboard}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routepath.examReport}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Report
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routepath.notifications}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Notifications
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routepath.profile}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profile
            </NavLink>
          </li>
          <li onClick={() => localStorage.clear()}>
            <a href="">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
