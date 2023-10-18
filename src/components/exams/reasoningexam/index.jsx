import React, { useEffect, useState } from "react";
import parseJSON from "../../../utils/jsonparser";
import Timer from "../../shared/Timer";
import { useParams } from "react-router-dom";
import { userData } from "../../../utils/loginData";
import { endpoints } from "../../../constants/endpoints";
import Axios from "axios";
import qs from "qs";
import NumberPad from "./NumberPad";
import notificationHelpers from "../../../utils/notification";

const ReasoningExam = ({ }) => {
  const [questions, setQuestions] = useState([]);
  const [loader, setloader] = useState(true)
  const [currentQuestionID, setcurrentQuestionID] = useState('')
  const [currentNumber, setcurrentNumber] = useState(0)
  const { quid,tottime } = useParams()
  const { access_token } = userData;
  const [answers, setAnswers] = useState({ user: access_token, exam: quid, data: [] });
  useEffect(() => {
    getReasoningExam(access_token, quid)
    console.log('quid,tottime', quid,tottime)
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
        notificationHelpers.error("An Error Occurred! Try Logging in again.");
        localStorage.clear();
        window.location.reload();
      }
      setloader(false)
    } catch (error) {
      console.log(error)
      setloader(false)
    }
  }
  const handleOptionChange = (oid, qid) => {
    const updatedData = answers.data.filter((item) => item.qid !== qid);
    const updatedAnswers = {
      user: access_token,
      exam: quid,
      data: [
        ...updatedData,
        {
          qid: qid,
          opt: oid,
        },
      ],
    };
    setAnswers(updatedAnswers)
    console.log('updatedAnswers', updatedAnswers)
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
            <Timer initialTime={tottime*60} onTimerEnd={() => null} />
          </div>
        </div>
        <div className="container">
          <div className="column">
            <div className="questions-container">
              <div className="container-head">Question {currentNumber + 1} :</div>
              <div dangerouslySetInnerHTML={{ __html: questions[currentNumber].question }}></div>
            </div>
            <div className="options-container">
              <div className="options-head">Options :</div>
              <div
              // className="options-list"
              >
                {questions[currentNumber].options.map((option) => (
                  <label key={option.oid} >
                    <input
                      type="radio"
                      // className="radio-button"
                      name={questions[currentNumber].id}
                      value={option.q_option}
                      onChange={() => { handleOptionChange(option.oid, questions[currentNumber].id) }}
                    />
                    <span htmlFor={questions[currentNumber].id} dangerouslySetInnerHTML={{ __html: option.q_option }} />
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
                <div style={{ backgroundColor: index == currentNumber ? "cyan" : "white", borderRadius: 10 }}>
                  <NumberPad key={index} questionID={question.id} number={index} current={currentNumber} setcurrentNumber={setcurrentNumber} setcurrentQuestionID={setcurrentQuestionID} />
                </div>
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
                  style={{ backgroundColor: "cyan" }}
                ></div>
                <div className="color-caption">Current</div>
              </div>
              <div className="color-box-wrap">
                <div
                  className="color-box"
                  style={{ backgroundColor: "#fdfdfd" }}
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
