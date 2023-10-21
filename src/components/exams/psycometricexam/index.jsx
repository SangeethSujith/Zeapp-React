import React, { useEffect, useState } from "react";
import Timer from "../../shared/Timer";
import { userData } from "../../../utils/loginData";
import Axios from "axios";
import qs from "qs";
import notificationHelpers from "../../../utils/notification";
import { endpoints } from "../../../constants/endpoints";
import { useNavigate } from "react-router-dom";
import { routepath } from "../../../constants/routepath";
const PsycometricExam = () => {
  const navigate = useNavigate();
  const { access_token } = userData;
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isMaxLimitExceeded, setIsMaxLimitExceeded] = useState(null);
  const [answers, setAnswers] = useState({
    data: [],
    user: access_token,
  });
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    getQuestions(access_token);
  }, []);

  const getQuestions = async (token) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.getPsychometricInterest}`,
        qs.stringify({ access_key: token })
      );

      const questionsData = response.data.data;
      const timerFromApi = response.data.time;
      if (response.data.http_code !== 300) {
        if (response.data.http_code === 200) {
          setQuestions(questionsData);
          setTimer(timerFromApi);
          setIsMaxLimitExceeded(false);
        } else {
          notificationHelpers.error("An Error Occurred! Try Logging in again.");
          localStorage.clear();
          window.location.reload();
        }
      } else {
        setIsMaxLimitExceeded(true);
      }
    } catch (error) {
      console.error("Error Getting Questions:", error);
    }
  };
  const handleNumberBoxClick = (questionId, number) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.data.findIndex(
        (answer) => answer.qid === parseInt(questionId)
      );

      if (existingAnswerIndex !== -1) {
        // If an answer for the question ID already exists, update the existing answer
        const updatedData = [...prevAnswers.data];
        updatedData[existingAnswerIndex] = {
          qid: parseInt(questionId),
          option: number,
        };

        return {
          ...prevAnswers,
          data: updatedData,
          user: access_token,
        };
      } else {
        // If no answer for the question ID exists, add a new answer
        return {
          ...prevAnswers,
          data: [
            ...prevAnswers.data,
            {
              qid: parseInt(questionId),
              option: number,
            },
          ],
          user: access_token,
        };
      }
    });
  };

  const sendAnswers = async (answers) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.savePsycometricExam}`,answers);
      if (response.data.status === "success") {
        notificationHelpers.success(
          "Psycometric Exam Was Completed Successfully"
        );
        setIsDisabled(true);
        navigate(routepath.dashboard)
      }
    } catch (error) {
      console.error("Error Sending Answers:", error);
    }
  };

  const handleSaveAnswers = (answers) => {
    if (questions.length !== answers.data.length) {
      notificationHelpers.warning(
        `${answers.data.length}/${questions.length} please answer all questions`
      );
    } else {
      sendAnswers(answers);
    }
  };

  if (isMaxLimitExceeded === true) {
    return <h1>Max Limit Exceeded</h1>;
  } else if (questions.length === 0) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <div className="main-head">
          <h1 className="page-header">Psycometrictest Test</h1>
          <div className="timer">
            {timer !== null && (
              <Timer
                initialTime={timer * 60}
                onTimerEnd={() => notificationHelpers.warning("Time Ran Out")}
              />
            )}
          </div>
        </div>
        <div className="container container-sw">
          <div className="column">
            <div
              className="questions-container bg-blue"
              style={{ maxWidth: "100%" }}
            >
              <p>
                Simply score the following statements from 1 to 5 in the clear
                box alongside each one. If you strongly disagree with a
                statement - score 1, and if you strongly agree score 5
              </p>
            </div>

            {questions.map((question, index) => (
              <div
                key={question.id}
                className="options-container d-flex fwrap "
                style={{ alignItems: "center" }}
              >
                <div className="card ct-card-1" style={{ maxWidth: "100%" }}>
                  <span className="q-no">
                    {index + 1}.<span>{question.interest_of_activity}</span>
                  </span>
                </div>
                <div className="card ct-card-2 ">
                  <div
                    className="w-100"
                    style={{
                      justifyItems: "center",
                      margin: "10px auto",
                      display: "inline-block",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((number) => (
                      <div
                        key={number}
                        className={`number-box ${
                          answers.data.length !== 0 &&
                          answers.data.some(
                            (item) =>
                              item.qid === parseInt(question.id) &&
                              item.option === number
                          )
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          handleNumberBoxClick(question.id, number)
                        }
                      >
                        {number}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bottom-btn-row">
          <button
            className="btn btn-red"
            onClick={() =>
              window.confirm(
                "Your answer may not be saved, Are you sure you want to quit?"
              ) && navigate(routepath.dashboard)
            }
          >
            Quit
          </button>
          <button
            className={`btn ${isDisabled ? "btn-disabled" : "btn-green"}`}
            onClick={() => handleSaveAnswers(answers)}
            disabled={isDisabled}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
};

export default PsycometricExam;
