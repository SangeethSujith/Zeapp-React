import Axios from "axios";
import qs from "qs";
import React, { useEffect, useState } from "react";
import career from "../../../assets/images/career.png";
import { endpoints } from "../../../constants/endpoints";
import useBeforeUnload from "../../../utils/hooks/useBeforeUnload";
import { userData } from "../../../utils/loginData";
import notificationHelpers from "../../../utils/notification";
import Timer from "../../shared/Timer";
import ReactPaginate from "react-paginate";
const CareerClusterExam = () => {
  useBeforeUnload(
    "You will be redirected to Login Page. You Progress May Not Be Saved"
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

  function parseData(jsonData) {
    // Initialize an array to store the parsed data
    const parsedData = [];

    // Loop through each item in the JSON array
    jsonData.forEach((item) => {
      // Extract relevant information
      const groupId = item.grp_id;
      const groupName = item.group_name;
      const subgroupId = item.sub_grp_id;
      const subGroupName = item.sub_group_name;
      const questionId = item.quid;
      const options = item.options;

      // Check if the group exists in the parsed data
      const groupIndex = parsedData.findIndex(
        (group) => group.grp_id === groupId
      );

      // If the group doesn't exist, add it
      if (groupIndex === -1) {
        parsedData.push({
          grp_id: groupId,
          group_name: groupName,
          subgroups: [
            {
              sub_group_id: subgroupId,
              sub_group_name: subGroupName,
              questions: [
                {
                  question_id: questionId,
                  options: options,
                },
              ],
            },
          ],
        });
      } else {
        // Check if the subgroup exists in the group
        const subgroupIndex = parsedData[groupIndex].subgroups.findIndex(
          (subgroup) => subgroup.sub_group_id === subgroupId
        );

        // If the subgroup doesn't exist, add it
        if (subgroupIndex === -1) {
          parsedData[groupIndex].subgroups.push({
            sub_group_id: subgroupId,
            sub_group_name: subGroupName,
            questions: [
              {
                question_id: questionId,
                options: options,
              },
            ],
          });
        } else {
          // Add the question to the existing subgroup
          parsedData[groupIndex].subgroups[subgroupIndex].questions.push({
            question_id: questionId,
            options: options,
          });
        }
      }
    });

    return parsedData;
  }

  const handleOptionClick = (group_id, sub_group_id, question_id) => {
    const existingAnswerIndex = answers.data.findIndex(
      (answer) =>
        answer.group_id === group_id &&
        answer.sub_group_id === sub_group_id &&
        answer.question_id === question_id
    );

    if (existingAnswerIndex !== -1) {
      const newData = [...answers.data];
      newData.splice(existingAnswerIndex, 1);
      setAnswers({ ...answers, data: newData });
    } else {
      setAnswers({
        ...answers,
        data: [...answers.data, { group_id, sub_group_id, question_id }],
      });
    }
  };
  const sendAnswers = async (data) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.saveCareerClusterExam}`,
        qs.stringify(answers)
      );
      if (response.data.status === "success") {
        notificationHelpers.success(
          "Career Cluster Exam Was Completed Successfully"
        );
        setIsDisabled(true);
      }
    } catch (error) {
      console.error("Error Sending Answers:", error);
    }
  };

  function countAnsweredQuestions(answerData) {
    const uniqueGroupIds = new Set(answerData.map((answer) => answer.group_id));
    return uniqueGroupIds.size;
  }
  function checkIfOneAnsweredPerSubgroup(answerData, questionData) {
    const answered = questionData.every((group) => {
      const { grp_id, subgroups } = group;

      return subgroups.every((subgroup) => {
        return subgroup.questions.some((question) => {
          return answerData.some(
            (answer) =>
              answer.group_id === grp_id &&
              answer.question_id === question.question_id
          );
        });
      });
    });

    return answered;
  }
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
    return <p>Loading...</p>; // Add a loading state
  } else {
    return (
      <div>
        <div className="main-head">
          <h1 className="page-header">Career Cluster Test</h1>
          <div className="timer">
            {timer !== null && (
              <Timer initialTime={timer} onTimerEnd={() => null} />
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
                      ${
                        answers.data.length !== 0 &&
                        answers.data.some(
                          (item) =>
                            item.group_id === group.grp_id &&
                            item.question_id === question.question_id
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
                              item.question_id === question.question_id
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
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            activeClassName={"button-active"}
          />
          <button className="save-button" onClick={handleSaveProgress}>
            Save Progress
          </button>
        </div>
      </div>
    );
  }
};

export default CareerClusterExam;
