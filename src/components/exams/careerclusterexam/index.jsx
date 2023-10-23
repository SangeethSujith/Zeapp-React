import Axios from "axios";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { endpoints } from "../../../constants/endpoints";
import useBeforeUnload from "../../../utils/hooks/useBeforeUnload";
import { userData } from "../../../utils/loginData";
import notificationHelpers from "../../../utils/notification";
import Timer from "../../shared/Timer";
import ReactPaginate from "react-paginate";
import { parseData } from "../../../utils/jsonParserForCareerCluster";
import {
  checkIfOneAnsweredPerSubgroup,
  countAnsweredQuestions,
} from "../../../utils/careerClusterAnswerConditions";
import { useNavigate } from "react-router-dom";
import { routepath } from "../../../constants/routepath";
const CareerClusterExam = () => {
  const navigate = useNavigate();
  useBeforeUnload(
    "You will be redirected to Login Page. Your Progress May Not Be Saved"
  );
  const { access_token } = userData;
  const [questions, setQuestions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isMaxLimitExceeded, setIsMaxLimitExceeded] = useState(null);
  const [answers, setAnswers] = useState({
    data: [],
    user: access_token,
  });
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    getQuestions(access_token);
  }, []);

  const getQuestions = async (token) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.getCareerClusterExam}`,
        qs.stringify({ access_key: token })
      );
      const questionsData = parseData(response.data.data);
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

  const handleOptionClick = (group_id, sub_group_id, question_id) => {
    const existingAnswerIndex = answers.data.findIndex(
      (answer) =>
        answer.group_id === group_id &&
        answer.sub_group_id === sub_group_id &&
        answer.option_id === question_id
    );

    if (existingAnswerIndex !== -1) {
      const newData = [...answers.data];
      newData.splice(existingAnswerIndex, 1);
      setAnswers({ ...answers, data: newData });
    } else {
      setAnswers({
        ...answers,
        data: [
          ...answers.data,
          { group_id, sub_group_id, option_id: question_id },
        ],
      });
    }
  };
  const sendAnswers = async (data) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.saveCareerClusterExam}`, answers);
      if (response.data.status === "success") {
        notificationHelpers.success(
          "Career Cluster Exam Was Completed Successfully"
        );
        setIsDisabled(true);
        navigate(routepath.dashboard);
      }
    } catch (error) {
      console.error("Error Sending Answers:", error);
    }
  };

  const handleSaveProgress = () => {
    const uniqueGroupCount = countAnsweredQuestions(answers.data);
    const isAllSubquestionsAnswered = checkIfOneAnsweredPerSubgroup(
      answers.data,
      questions
    );
    if (questions.length !== uniqueGroupCount) {
      notificationHelpers.warning(
        `${uniqueGroupCount}/${questions.length} Groups has been Completed. Please answer all Groups`
      );
    } else {
      if (isAllSubquestionsAnswered) {
        sendAnswers(answers);
      } else {
        notificationHelpers.warning(
          `You have pending subquestions to be answered`
        );
      }
    }
  };

  // PAGINATION
  const itemsPerPage = 1; // Number of groups to display per page
  const pageCount = Math.ceil(questions.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedGroups = questions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (isMaxLimitExceeded === true) {
    return <h1>Max Limit Exceeded</h1>;
  } else if (questions.length === 0) {
    return (
      <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      </div>
    ) // Add a loading state
  } else {
    return (
      <div>
        <div className="main-head">
          <h1 className="page-header">Career Cluster Test</h1>
          <div className="timer">
            {timer !== null && (
              <Timer
                initialTime={timer * 60}
                onTimerEnd={() => notificationHelpers.warning("Time Ran Out")}
              />
            )}
          </div>
        </div>
        <div>
          {displayedGroups.map((group, index) => (
            <div key={group.grp_id} className="columns">
              {group.subgroups.map((subgroup, index) => (
                <div key={subgroup.sub_group_id} className="column">
                  <h2>{subgroup.sub_group_name}</h2>
                  {subgroup.questions.map((question, index) => (
                    <div
                      key={question.question_id}
                      className={`list-item 
                      ${answers.data.length !== 0 &&
                          answers.data.some(
                            (item) =>
                              item.group_id === group.grp_id &&
                              item.option_id === question.question_id
                          )
                          ? "selected"
                          : ""
                        }`}
                      onClick={() =>
                        handleOptionClick(
                          group.grp_id,
                          subgroup.sub_group_id,
                          question.question_id
                        )
                      }
                    >
                      {question.options}
                      <span
                        className="green-tick "
                        style={
                          answers.data.length !== 0 &&
                            answers.data.some(
                              (item) =>
                                item.group_id === group.grp_id &&
                                item.option_id === question.question_id
                            )
                            ? { display: "inline" }
                            : { display: "none" }
                        }
                      >
                        &#10004;
                      </span>
                    </div>
                  ))}
                  {/* Repeat the pattern for other activities */}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="cce-buttons-container" draggable={false}>
          <ReactPaginate
            breakLabel="..."
            nextLabel="NEXT"
            nextClassName="pagination-buttons pagination-normal"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="PREVIOUS"
            previousClassName="pagination-buttons pagination-normal"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            pageClassName={"pagination-buttons pagination-normal"}
            activeClassName={"button-active"}
          />
        </div>
        <div className="career-cluster">
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
            onClick={() => { window.confirm("Do you want to save the exam?") && handleSaveProgress() }}
            disabled={isDisabled}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
};

export default CareerClusterExam;
