import React, { useEffect } from "react";
import parseJSON from "../../../utils/jsonparser";
import Header from "../../shared/Header";
import useBeforeUnload from "../../../utils/hooks/useBeforeUnload";
import Footer from "../../shared/Footer";

const ReasoningExam = () => {
  useBeforeUnload("Are you sure you want to leave this page?");

  const response = {
    status: "success",
    data: [
      {
        id: "64",
        type: "Multiple Choice Single Answer",
        question:
          '<p><img src="../../../../upload/Question_Number_59_in_aspect_ratio9.png" /></p>',
        options: [
          {
            oid: "337",
            q_option: "<p>(A)</p>",
          },
          {
            oid: "338",
            q_option: "<p>(B)</p>",
          },
          {
            oid: "339",
            q_option: "<p>(C)</p>",
          },
          {
            oid: "340",
            q_option: "<p>(D)</p>",
          },
        ],
      },
      {
        id: "63",
        type: "Multiple Choice Single Answer",
        question: "<p>test question</p>",
        options: [
          {
            oid: "333",
            q_option: "<p>test</p>",
          },
          {
            oid: "334",
            q_option: "<p>test</p>",
          },
          {
            oid: "335",
            q_option: "<p>test</p>",
          },
          {
            oid: "336",
            q_option: "<p>test</p>",
          },
        ],
      },
      {
        id: "54",
        type: "Multiple Choice Single Answer",
        question: '<p><img src="../../../upload/Completion1.jpg" /></p>',
        options: [
          {
            oid: "237",
            q_option: "<p>(A)</p>",
          },
          {
            oid: "238",
            q_option: "<p>(B)</p>",
          },
          {
            oid: "239",
            q_option: "<p>(C)</p>",
          },
          {
            oid: "240",
            q_option: "<p>(D)</p>",
          },
        ],
      },
      {
        id: "53",
        type: "Multiple Choice Single Answer",
        question: '<p><img src="../../../../upload/Completion.jpg" /></p>',
        options: [
          {
            oid: "217",
            q_option: "<p>(A)</p>",
          },
          {
            oid: "218",
            q_option: "<p>(B)</p>",
          },
          {
            oid: "219",
            q_option: "<p>(C)</p>",
          },
          {
            oid: "220",
            q_option: "<p>(D)</p>",
          },
        ],
      },
    ],
    http_code: 200,
  };

  useEffect(() => {
    const parsed = parseJSON(response.data);
    console.log("parsed", parsed);
  }, []);

  return (
    <div>
      <Header />
      <div className="main-head" style={{ display: "flex" }}>
        <h1 className="page-header">Reasoning Test</h1>
        <div className="timer">
          <div id="app"></div>
        </div>
      </div>
      <div className="container">
        <div className="column">
          <div className="questions-container">
            <div className="container-head">Question 1 :</div>
            <p>Study the figure below and answer the following questions</p>
            <img src="test-image-question.png" alt="" />
            <ul className="questions-list">
              <li>
                Find out the number of families which have all the four things
                mentioned in the diagram
              </li>
            </ul>
          </div>
          <div className="options-container">
            <div className="options-head">Options :</div>
            <ul className="options-list">
              <li>
                Option 1 <input type="radio" className="radio-button" />
              </li>
              <li>
                Option 2 <input type="radio" className="radio-button" />
              </li>
            </ul>
          </div>
          <div className="bottom-btn-row">
            <button className="btn btn-blue">Previous</button>
            <button className="btn btn-blue">Next</button>
            <button className="btn btn-red">Quit</button>
            <button className="btn btn-green">Save</button>
          </div>
        </div>
        <div className="column second-column">
          <div className="button-row"></div>
          <div className="color-indicator">
            <div className="color-box-wrap">
              <div
                className="color-box"
                style={{ backgroundColor: "#53d380" }}
              ></div>
              <div className="color-caption">Answered</div>
            </div>
            <div className="color-box-wrap">
              <div
                className="color-box"
                style={{ backgroundColor: "#f57572" }}
              ></div>
              <div className="color-caption">Unanswered</div>
            </div>
            <div className="color-box-wrap">
              <div
                className="color-box"
                style={{ backgroundColor: "#f8b551" }}
              ></div>
              <div className="color-caption">Review-later</div>
            </div>
            <div className="color-box-wrap">
              <div
                className="color-box"
                style={{ backgroundColor: "#249ef2" }}
              ></div>
              <div className="color-caption">Not-visited</div>
            </div>
          </div>
          <div className="textarea-row" style={{ display: "none" }}>
            <textarea placeholder="Enter text"></textarea>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReasoningExam;
