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
        
        <div className="app-buttons">
        <a target='_blank' href="https://play.google.com/store/apps/details?id=com.udyata.myapps.zeapp&pli=1">
          <button className="app-button">Download on Play Store</button>
        </a>
          <button className="app-button">Download on App Store</button>
        </div>
      </div>
      <div className="footer2">&copy; 2023 Zeapp All Rights Reserved.</div>
    </>
  );
};

export default Footer;
