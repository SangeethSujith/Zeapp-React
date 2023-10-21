import Axios from "axios";
import qs from "qs";
import React, { useEffect, useState } from "react";
import career from "../../../assets/images/career.png";
import { endpoints } from "../../../constants/endpoints";
import useBeforeUnload from "../../../utils/hooks/useBeforeUnload";
import { userData } from "../../../utils/loginData";
import notificationHelpers from "../../../utils/notification";
import Timer from "../../shared/Timer";
import { useNavigate } from "react-router-dom";
import { routepath } from "../../../constants/routepath";
const CareerInterestExam = () => {
  const navigate = useNavigate();
  useBeforeUnload(
    "You will be redirected to Login Page. You Progress May Not Be Saved"
  );
  const { access_token } = userData;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({ user: "", data: [] });
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isMaxLimitExceeded, setIsMaxLimitExceeded] = useState(null);
  useEffect(() => {
    getQuestions(access_token);
  }, []);

  const getQuestions = async (token) => {
    try {
      const response = await Axios.post(
        `${
          import.meta.env.VITE_API_URL + endpoints.getCareerInterestQuestions
        }`,
        qs.stringify({ access_key: token })
      );

      const questionsData = response.data.data;
      const timerFromApi = response.data.time;
      if (response.data.http_code !== 300) {
        if (response.data.http_code === 200) {
          setQuestions(parseCareerInterestQuestions(questionsData));
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

  const sendAnswers = async (answers) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.saveCareerInterest}`,answers);
      if (response.data.status === "success") {
        notificationHelpers.success(
          "Career Interest Exam Was Completed Successfully"
        );
        setIsDisabled(true);
        navigate(routepath.dashboard)

      }
    } catch (error) {
      console.error("Error Sending Answers:", error);
    }
  };

  const parseCareerInterestQuestions = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const srl_no = item.srl_no;
      const option = { desc: item.desc, option: item.option };

      if (!groupedData[srl_no]) {
        groupedData[srl_no] = { srl_no, options: [] };
      }

      groupedData[srl_no].options.push(option);
    });

    return Object.values(groupedData);
  };

  const handleOptionChange = (qid, option) => {
    const updatedData = answers.data.filter(
      (item) => parseInt(item.qid) !== parseInt(qid)
    );
    const updatedAnswers = {
      user: access_token,
      data: [
        ...updatedData,
        {
          qid: parseInt(qid),
          option: option,
        },
      ],
    };
    setAnswers(updatedAnswers);
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
    return (
      <div style={{display:"flex",height:"100%",justifyContent:"center",alignItems:"center"}}>
        <div class="loader-container">
          <span class="loader"></span>
        </div>
      </div>
    ) // Add a loading state
  } else {
    return (
      <div>
        <div className="main-head">
          <h1 className="page-header">Career Interest Test</h1>
          <div className="timer">
            {timer !== null && (
              <Timer
                initialTime={timer * 60}
                onTimerEnd={() => notificationHelpers.warning("Time Ran Out")}
              />
            )}
          </div>
        </div>
        <div className="container">
          <div className="column">
            <div className="questions-container bg-blue">
              <p>
                This activity helps you match your interests to different types
                of careers. For each item, select the letter of the activity you
                would rather do
              </p>
            </div>
            <div className="options-wrap">
              {questions.length !== 0 &&
                questions.map((question, index) => (
                  <div key={question.srl_no} className="options-container">
                    <div className="card">
                      <div className="q-no">{index + 1}</div>

                      {question.options.map((option, index) => (
                        <label key={index} className="checkbox-label">
                          <input
                            type="radio"
                            className="checkbox-input"
                            name={question.srl_no}
                            value={option.option}
                            onChange={() =>
                              handleOptionChange(question.srl_no, option.option)
                            }
                          />
                          {option.desc}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div
            className="column second-column"
            style={{
              height: "fit-content",
              textAlign: "center",
              padding: "8% 10px",
            }}
          >
            <div className="gif">
              <img src={career} alt="" style={{ width: "300px" }} />
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
        </div>
      </div>
    );
  }
};

export default CareerInterestExam;
