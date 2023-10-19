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
import useBeforeUnload from "../../../utils/hooks/useBeforeUnload";

const ReasoningExam = ({ }) => {
  useBeforeUnload(
    "You will be redirected to Login Page. Your Progress May Not Be Saved"
  );
  const [questions, setQuestions] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentNumber, setcurrentNumber] = useState(0);
  const { quid, tottime } = useParams();
  const { access_token } = userData;
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [answers, setAnswers] = useState({
    user: access_token,
    exam: quid,
    data: [],
  });
  const [isUnAnswered, setIsUnAnswered] = useState(false);
  const [timerWithID, setTimerWithID] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    getReasoningExam(access_token, quid);
    setStartTime(getCurrentTimeUnix())
  }, []);

  const getReasoningExam = async (token, quid) => {
    try {
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
      setLoader(false);
    } catch (error) {
      console.log(error);

      setLoader(false);
    }
  };

  const handleOptionChange = (oid, qid, time) => {
    // const updatedData = answers.data.filter((item) => item.qid !== qid);

    setTimerWithID((prevTimerWithID) => {
      // Check if an object with the same qid exists in the array
      const existingObjectIndex = prevTimerWithID.findIndex(
        (item) => item.qid === qid
      );

      if (existingObjectIndex !== -1) {
        // If an object with the same qid exists, add the time to its time array
        prevTimerWithID[existingObjectIndex].time.push(time);
      } else {
        // If no object with the same qid exists, create a new object and add it to the array
        prevTimerWithID.push({ qid, time: [time] });
      }

      return prevTimerWithID;
    });
    setAnswers((prevAnswers) => ({
      user: access_token,
      exam: quid,
      start: startTime,
      data: [
        ...prevAnswers.data.filter((item) => item.qid !== qid),
        {
          qid: qid,
          opt: oid,
        },
      ],

    }));
  };
  const handleClick = (num) => {
    setcurrentNumber(num);
  };
  const progress = (condition) => {
    if (condition == "plus") {
      if (currentNumber < questions.length - 1) {
        setcurrentNumber(currentNumber + 1);
      } else {
        notificationHelpers.info("You are already on the last question");
      }
    } else {
      if (currentNumber >= 1) {
        setcurrentNumber(currentNumber - 1);
      } else {
        notificationHelpers.info("You are already on the first question");
      }
    }
  };
  const getCurrentTimeUnix = () => {
    const date = new Date();
    return date.getTime()
  }
  // sending exams

  const sendAnswers = async (answers) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.savePsycometricExam}`,
        qs.stringify(answers)
      );
      if (response.data.status === "success") {
        notificationHelpers.success(
          "Reasoning Exam Was Completed Successfully"
        );
        setIsDisabled(true);
      }
    } catch (error) {
      console.error("Error Sending Answers:", error);
      notificationHelpers.error("Something went wrong");
    }
  };

  const handleSaveAnswers = () => {

    if (questions.length !== answers.data.length) {
      setIsUnAnswered(true);
      notificationHelpers.warning(
        `${answers.data.length}/${questions.length} please answer all questions`
      );
    } else {
      const totalTimes = {};
      timerWithID.forEach((item) => {
        if (totalTimes[item.qid]) {
          totalTimes[item.qid] += item.time;
        } else {
          totalTimes[item.qid] = item.time;
        }
      });

      // Step 2: Map answers.data and add the total time
      const AnswerWithTime = answers.data.map((answer) => {
        const total = totalTimes[answer.qid] || 0;
        answer["ind_time"] = eval(total.join("+")) * 1000; // You can store the total time in a new property like "totalTime" for each answer
        // return answer
        return answer
      });
      const finalData = {
        data: AnswerWithTime,
        endTime: getCurrentTimeUnix(),
        tot_time: getCurrentTimeUnix() - startTime,
        user: access_token,
        exam: quid,
        start: startTime,
        subject:0
      }
      // setAnswers({
      //   ...answers, // Spread the current state
      //   data: AnswerWithTime,
      //   end:getCurrentTimeUnix(),
      //   tot_time:getCurrentTimeUnix()-startTime
      // });
      // console.log('AnswerWithTime', answers)
      sendAnswers(finalData);
    }
  };

  if (loader === true) {
    return <div>LOADING</div>;
  } else {
    return (
      <div>
        <div className="main-head" style={{ display: "flex" }}>
          <h1 className="page-header">Reasoning Test</h1>
          <div className="timer">
            <Timer
              initialTime={tottime * 60}
              onTimerEnd={() => notificationHelpers.warning("Time Ran Out")}
            />
          </div>
        </div>
        <div className="container">
          <div className="column">
            <QuestionContainer
              currentNumber={currentNumber}
              questions={questions}
              handleOptionChange={handleOptionChange}
              answers={answers.data}
            />
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
              <button
                className={`btn ${isDisabled ? "btn-disabled" : "btn-green"}`}
                disabled={isDisabled}
                onClick={handleSaveAnswers}
              >
                Save
              </button>
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
                        index == currentNumber ? "#5272F2" : "white",
                      borderRadius: 10,
                    }}
                  >
                    <button
                      className={`button ${answers.data.some((item) => item.qid === question.id)
                        ? "btn-answered"
                        : isUnAnswered && "btn-un-answered"
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
