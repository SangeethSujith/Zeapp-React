import React from "react";
import { Link, NavLink } from "react-router-dom";
import { routepath } from "../../../constants/routepath";

const Header = ({ isMenuHidden }) => {
  const loginData = JSON.parse(localStorage.getItem("userData"));
  return (
    <header>
      <div className="logo">
        <Link to={routepath.dashboard}>
          <img
            src="../../../src/assets/images/zeapp-logo.png"
            alt="zeapp-Logo"
          />
        </Link>
      </div>
      <button className="burger-button">&#9776;</button>
      {!isMenuHidden && (
        <nav className="main-menu">
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
        </nav>
      )}
    </header>
  );
};

export default Header;
