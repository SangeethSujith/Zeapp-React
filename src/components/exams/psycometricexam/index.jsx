import React, { useEffect, useState } from "react";
import Timer from "../../shared/Timer";
import { userData } from "../../../utils/loginData";
import Axios from "axios";
import qs from "qs";
import notificationHelpers from "../../../utils/notification";
import { endpoints } from "../../../constants/endpoints";
const PsycometricExam = () => {
  const { access_token } = userData;
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isMaxLimitExceeded, setIsMaxLimitExceeded] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({
    data: [],
    user: access_token,
  });
  console.log("selectedAnswers", selectedAnswers);
  // console.log(
  //   "data.find",
  //   (selectedAnswers.data.find((item) => item.qid === 10)).option
  // );
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
          // setTimer(timerFromApi);
          setIsMaxLimitExceeded(false);
        } else {
          notificationHelpers.error("An Error Occurred! Try Logging in again.");
          localStorage.clear();
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error Getting Questions:", error);
    }
  };
  const handleNumberBoxClick = (questionId, number) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const existingAnswerIndex = prevSelectedAnswers.data.findIndex(
        (answer) => answer.qid === parseInt(questionId)
      );

      if (existingAnswerIndex !== -1) {
        // If an answer for the question ID already exists, update the existing answer
        const updatedData = [...prevSelectedAnswers.data];
        updatedData[existingAnswerIndex] = {
          qid: parseInt(questionId),
          option: number,
        };

        return {
          ...prevSelectedAnswers,
          data: updatedData,
          user: access_token,
        };
      } else {
        // If no answer for the question ID exists, add a new answer
        return {
          ...prevSelectedAnswers,
          data: [
            ...prevSelectedAnswers.data,
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

  if (isMaxLimitExceeded === true) {
    return <h1>Max Limit Exceeded</h1>;
  } else {
    return (
      <div>
        <div className="main-head">
          <h1 className="page-header">Interest Test</h1>
          <div className="timer">
            <Timer />
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
                          selectedAnswers.data.length !== 0 &&
                          selectedAnswers.data.some(
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
      </div>
    );
  }
};

export default PsycometricExam;
