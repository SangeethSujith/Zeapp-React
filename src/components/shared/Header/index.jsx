import React from "react";

const Header = ({ loginPage }) => {
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
      {!loginPage && (
        <nav className="main-menu">
          <ul>
            <li>
              <a href="" className="active">
                Home
              </a>
            </li>
            {loginData && loginData.view_report === "Y" && (
              <li>
                <a href="">Report</a>
              </li>
            )}

            <li>
              <a href="">Notification</a>
            </li>
            <li>
              <a href="">Profile</a>
            </li>
            <li onClick={localStorage.clear()}>
              <a href="">Logout</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
