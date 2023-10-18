import React, { useEffect, useState } from "react";
import parseJSON from "../../../utils/jsonparser";
import Timer from "../../shared/Timer";
import { useParams } from "react-router-dom";
import { userData } from "../../../utils/loginData";
import { endpoints } from "../../../constants/endpoints";
import Axios from "axios";
import qs from "qs";
import notificationHelpers from "../../../utils/notification";
import QuestionContainer from "./QuestionContainer";

const ReasoningExam = ({ }) => {
  const [questions, setQuestions] = useState([]);
  const [loader, setloader] = useState(true);
  const [currentNumber, setcurrentNumber] = useState(0);
  const { quid, tottime } = useParams();
  const { access_token } = userData;
  const [answers, setAnswers] = useState({
    user: access_token,
    exam: quid,
    data: [],
  });
  console.log(
    "answers",
    answers.data.some((item) => item.qid === "418")
  );
  useEffect(() => {
    getReasoningExam(access_token, quid);
    console.log("quid,tottime", quid, tottime);
  }, []);

  const getReasoningExam = async (token, quid) => {
    try {
      setloader(true);
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.getReasoningExam}`,
        qs.stringify({ access_key: token, exam: quid })
      );
      if (response.data.status === "success") {
        const questionsResponse = parseJSON(response.data.data);
        setQuestions(questionsResponse);
      } else {
        notificationHelpers.error("An Error Occurred! Try Logging in again.");
        localStorage.clear();
        window.location.reload();
      }
      setloader(false);
    } catch (error) {
      console.log(error);
      setloader(false);
    }
  };
  const sendReasoningExam = async () => {
    try {
      setloader(true)
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.saveExamResults}`,
        qs.stringify(answers))
      if (response.data.status === "success") {
        notificationHelpers.success("Answers Submitted Successfully")
      } else {
        notificationHelpers.error("An Error Occurred! Try Logging in again.");
        localStorage.clear();
        window.location.reload();
      }
      setloader(false);
    } catch (error) {
      console.log(error);
      notificationHelpers.error("Something went wrong");
      setloader(false);
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
    setAnswers(updatedAnswers);
    console.log("updatedAnswers", updatedAnswers);
  };
  const handleClick = (num) => {
    setcurrentNumber(num);
  };
  const progress = (condition) => {
    if (condition == "plus") {
      if (currentNumber < questions.length - 1) {
        setcurrentNumber(currentNumber + 1)
      } else {
        notificationHelpers.info("You are already on the last question")
      }
    }
    else {
      if (currentNumber >= 1) {
        setcurrentNumber(currentNumber - 1)
      } else {
        notificationHelpers.info("You are already on the first question")
      }
    }
  }
  if (loader == true) {
    return <div>LOADING</div>;
  } else {
    return (
      <div>
        <div className="main-head" style={{ display: "flex" }}>
          <h1 className="page-header">Reasoning Test</h1>
          <div className="timer">
            <Timer initialTime={tottime * 60} onTimerEnd={() => null} />
          </div>
        </div>
        <div className="container">
          <div className="column">
            <QuestionContainer currentNumber={currentNumber} questions={questions} handleOptionChange={handleOptionChange} />
            <div className="bottom-btn-row">
              <button
                className="btn btn-blue"
                onClick={() => {
                  progress("minus");
                }}
              >
                Previous
              </button>
              <button
                className="btn btn-blue"
                onClick={() => {
                  progress("plus");
                }}
              >
                Next
              </button>
              <button className="btn btn-red">Quit</button>
              <button className={`btn ${answers.data.length==questions.length&&"btn-green"}`} disabled={answers.data.length==questions.length?false:true} onClick={() => sendReasoningExam()}>Save</button>
            </div>
          </div>
          <div className="column second-column">
            <div className="button-row">
              {questions.length !== 0 &&
                questions.map((question, index) => (
                  <div
                    key={question.id}
                    style={{
                      backgroundColor:
                        index == currentNumber ? "#5546e9" : "white",
                      borderRadius: 10,
                    }}
                  >
                    <button
                      className={`button ${answers.data.some((item) => item.qid === question.id) &&
                        "btn-answered"
                        }
                      `}
                      onClick={() => {
                        handleClick(index, question.id);
                      }}
                    >
                      {index + 1}
                    </button>
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
                  style={{ backgroundColor: "#5546e9" }}
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
  }
};

export default ReasoningExam;
