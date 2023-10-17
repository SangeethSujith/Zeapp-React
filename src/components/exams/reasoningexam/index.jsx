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
  const [loader, setloader] = useState(true)
  const { quid } = useParams()
  const { access_token } = userData;
  useEffect(() => {
    getReasoningExam(access_token, quid)
  }, []);

  const getReasoningExam = async (token, quid) => {
    try {
      setloader(true)
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.getReasoningExam}`,
        qs.stringify({ access_key: token, exam: quid })
      );
      if (response.data.status === "success") {
        const questionsResponse = parseJSON(response.data.data)
        setQuestions(questionsResponse)
      } else {
        localStorage.clear()
        window.location.reload()
      }
      setloader(false)
    } catch (error) {
      console.log(error)
      setloader(false)
    }
  }
  if (loader == true) {
    return (
      <div>LOADING</div>
    )
  } else {
    return (
      <div>
        <div className="main-head" style={{ display: "flex" }}>
          <h1 className="page-header">Reasoning Test</h1>
          <div className="timer">
            <Timer initialTime={1000} onTimerEnd={() => null} />
          </div>
        </div>
        <div className="container">
          <div className="column">
            <div className="questions-container">
              <div className="container-head">Question 1 :</div>
              <div dangerouslySetInnerHTML={{ __html: questions[0].question }}></div>
              {/* {questions[0].question} */}
              {/* <p>Study the figure below and answer the following questions</p> */}
              {/* <img src="./../../../assets/images/test-image-question.png" alt="" /> */}
              {/* <ul className="questions-list">
              <li>
                Find out the number of families which have all the four things
                mentioned in the diagram
              </li>
            </ul> */}
            </div>
            <div className="options-container">
              <div className="options-head">Options :</div>
              <div 
              // className="options-list"
              >
                {questions[0].options.map((option) => (
                  <label key={option.oid} >
                    <input
                      type="radio"
                      // className="radio-button"
                      name={questions[0].id}
                      value={option.q_option}
                    />
                  <span htmlFor={questions[0].id} dangerouslySetInnerHTML={{ __html: option.q_option }} />
                    {/* <li className="radio-button" dangerouslySetInnerHTML={{ __html: option.q_option }}/> */}
                  </label>
                ))}
              </div>

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
              {questions.length !== 0 && questions.map((question, index) => (
                <NumberPad key={index} questionID={question.id} number={index + 1} />
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
      </div>
    );
  };
}

export default ReasoningExam;
