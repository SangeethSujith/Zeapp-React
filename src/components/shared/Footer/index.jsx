import React from "react";
import ZeappLogo from "../../../assets/images/zeapp-logo.png";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-logo">
          <a href="">
            <img src={ZeappLogo} alt="zeapp-Logo" />
          </a>
        </div>

        <div className="app-buttons">
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.udyata.myapps.zeapp&pli=1"
          >
            <button className="app-button">Download on Play Store</button>
          </a>
          <button className="app-button">Download on App Store</button>
        </div>
      </div>
      <div className="footer2">&copy; 2023 Zeapp All Rights Reserved. Version 1.0</div>
    </>
  );
};

export default Footer;
