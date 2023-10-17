import React from "react";

const CareerClusterExam = () => {
  return (
    <>
      <h1 className="heading">Career Cluster Test</h1>
      <div className="columns">
        <div className="column">
          <h2>Activities that describe what I like to do:</h2>
          <div
            className="list-item selected"
            onClick={() => this.toggleBackgroundColor(this)}
          >
            Learn how things grow and stay alive{" "}
            <span className="green-tick " style={{ display: "inline" }}>
              &#10004;
            </span>
          </div>
          {/* Repeat the pattern for other activities */}
        </div>
        <div className="column">
          <h2>Personal qualities that describe me:</h2>
          <div
            className="list-item"
            onClick={() => this.toggleBackgroundColor(this)}
          >
            Self-reliant{" "}
            <span className="green-tick" style={{ display: "none" }}>
              &#10004;
            </span>
          </div>
          {/* Repeat the pattern for other qualities */}
        </div>
        <div className="column">
          <h2>School subjects that I like:</h2>
          <div
            className="list-item"
            onClick={() => this.toggleBackgroundColor(this)}
          >
            Math{" "}
            <span className="green-tick" style={{ display: "none" }}>
              &#10004;
            </span>
          </div>
          {/* Repeat the pattern for other subjects */}
        </div>
      </div>
      <div className="buttons">
        <button>Previous</button>
        <button>Save Progress</button>
        <button>Next</button>
      </div>
    </>
  );
};

export default CareerClusterExam;
