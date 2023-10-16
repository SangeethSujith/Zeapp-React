import React, { useEffect, useState } from "react";
import parseJSON from "../../../utils/jsonparser";
import Footer from "../../shared/Footer";
import Timer from "../../shared/Timer";
import { useParams } from "react-router-dom";
import { userData } from "../../../utils/loginData";
import { endpoints } from "../../../constants/endpoints";
import Axios from "axios";
import qs from "qs";
import NumberPad from "./NumberPad";

const ReasoningExam = () => {
  const [questions, setQuestions] = useState([]);
  console.log('questions', questions)
  const { quid } = useParams()
  const { access_token } = userData;
  useEffect(() => {
    getReasoningExam(access_token, quid)
  }, []);

  const getReasoningExam = async (token, quid) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.getReasoningExam}`,
        qs.stringify({ access_key: token, exam: quid })
      );
      if(response){

        const questionsResponse = parseJSON(response.data.data)
        setQuestions(questionsResponse)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="main-head" style={{ display: "flex" }}>
        <h1 className="page-header">Reasoning Test</h1>
        <div className="timer">
          <Timer initialTime={4} onTimerEnd={() => null} />
        </div>
      </div>
      <div className="container">
        <div className="column">
          <div className="questions-container">
            <div className="container-head">Question 1 :</div>
            <p>Study the figure below and answer the following questions</p>
            {/* <img src="./../../../assets/images/test-image-question.png" alt="" /> */}
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
          <div className="button-row">
            { questions.map((question, index) => (
              <NumberPad key={index} questionID={question.id} number={index+1} />
            ))}
          </div>
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
