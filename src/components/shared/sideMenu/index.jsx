import React from "react";
import {  NavLink } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="left">
      <div className="company">
        <div className="logo">
          <img src="../../../src/assets/images/zeapp-logo.png" alt="main" />
        </div>
      </div>
      <div className="navigation">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/report"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Report
            </NavLink>
          </li>
          <li>
            <a href="">Notification</a>
          </li>
          <li>
            <a href="">Profile</a>
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
