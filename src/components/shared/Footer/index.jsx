import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-logo">
          <a href="">
            <img
              src="../../../src/assets/images/zeapp-logo.png"
              alt="zeapp-Logo"
            />
          </a>
        </div>
        <ul className="footer-menu">
          <li>
            <a href="" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="">Report</a>
          </li>
          <li>
            <a href="">Notification</a>
          </li>
          <li>
            <a href="">Profile</a>
          </li>
          <li>
            <a href="">Logout</a>
          </li>
        </ul>
        <div className="app-buttons">
          <button className="app-button">Download on Play Store</button>
          <button className="app-button">Download on App Store</button>
        </div>
      </div>
      <div className="footer2">&copy; 2023 Zeapp All Rights Reserved.</div>
    </>
  );
};

export default Footer;
