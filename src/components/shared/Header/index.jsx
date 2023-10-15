import React from "react";
import { Link, NavLink } from "react-router-dom";
import { routepath } from "../../../constants/routepath";

const Header = ({ isMenuHidden }) => {
  const loginData = JSON.parse(localStorage.getItem("userData"));
  return (
    <header>
      <div className="logo">
        <a href="">
          <img
            src="../../../src/assets/images/zeapp-logo.png"
            alt="zeapp-Logo"
          />
        </a>
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
            <NavLink
              to={routepath.examReport}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Report
            </NavLink>
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
        </nav>
      )}
    </header>
  );
};

export default Header;
