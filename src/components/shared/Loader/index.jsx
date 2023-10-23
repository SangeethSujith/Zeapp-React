import React from "react";

const Loader = () => {
  return (
    <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    </div>
  )
};

export default Loader;
