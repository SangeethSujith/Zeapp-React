import React from "react";

const SideMenu = () => {
  const loginData = JSON.parse(localStorage.getItem("userData"));
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
            <a
              href=""

            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
