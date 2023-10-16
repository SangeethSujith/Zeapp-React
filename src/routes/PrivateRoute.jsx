// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/shared/Header";
import SideMenu from "../components/shared/sideMenu";
import Footer from "../components/shared/Footer";
import { routepath } from "../constants/routepath";

const PrivateLayout = ({ children }) => {
  const isHeaderHidden =
    location.pathname === routepath.dashboard ||
    location.pathname === routepath.examReport ||
    location.pathname === routepath.profile ||
    location.pathname === routepath.notifications;

  return (
    <div className={isHeaderHidden && "center"}>
      {isHeaderHidden ? <SideMenu /> : <Header />}

      <div>
        <main>{children}</main>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token");

  return isLoggedIn ? (
    <PrivateLayout>{children}</PrivateLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
