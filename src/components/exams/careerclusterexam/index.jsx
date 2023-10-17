import Axios from "axios";
import qs from "qs";
import React, { useEffect, useState } from "react";
import career from "../../../assets/images/career.png";
import { endpoints } from "../../../constants/endpoints";
import useBeforeUnload from "../../../utils/hooks/useBeforeUnload";
import { userData } from "../../../utils/loginData";
import notificationHelpers from "../../../utils/notification";
import Timer from "../../shared/Timer";
const CareerClusterExam = () => {
  useBeforeUnload(
    "You will be redirected to Login Page. You Progress May Not Be Saved"
  );
  const { access_token } = userData;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({ user: "", data: [] });
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isMaxLimitExceeded, setIsMaxLimitExceeded] = useState(null);
  console.log("questions", questions);
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

  // const sendAnswers = async (answers) => {
  //   try {
  //     const response = await Axios.post(
  //       `${import.meta.env.VITE_API_URL + endpoints.saveCareerInterest}`,
  //       qs.stringify(answers)
  //     );
  //     if (response.data.status === "success") {
  //       notificationHelpers.success(
  //         "Career Interest Exam Was Completed Successfully"
  //       );
  //       setIsDisabled(true);
  //     }
  //   } catch (error) {
  //     console.error("Error Sending Answers:", error);
  //   }
  // };

  // const parseCareerInterestQuestions = (data) => {
  //   const groupedData = {};

  //   data.forEach((item) => {
  //     const srl_no = item.srl_no;
  //     const option = { desc: item.desc, option: item.option };

  //     if (!groupedData[srl_no]) {
  //       groupedData[srl_no] = { srl_no, options: [] };
  //     }

  //     groupedData[srl_no].options.push(option);
  //   });

  //   return Object.values(groupedData);
  // };

  // const handleOptionChange = (qid, option) => {
  //   const updatedData = answers.data.filter(
  //     (item) => parseInt(item.qid) !== parseInt(qid)
  //   );
  //   const updatedAnswers = {
  //     user: access_token,
  //     data: [
  //       ...updatedData,
  //       {
  //         qid: parseInt(qid),
  //         option: option,
  //       },
  //     ],
  //   };
  //   setAnswers(updatedAnswers);
  // };

  // const handleSaveAnswers = (answers) => {
  //   if (questions.length !== answers.data.length) {
  //     notificationHelpers.warning(
  //       `${answers.data.length}/${questions.length} please answer all questions`
  //     );
  //   } else {
  //     sendAnswers(answers);
  //   }
  // };
  if (isMaxLimitExceeded === true) {
    return <h1>Max Limit Exceeded</h1>;
  } else if (questions.length === 0) {
    return <p>Loading...</p>; // Add a loading state
  } else {
    return (
      <>
        <h1 className="heading">Career Cluster Test</h1>
        <div className="columns">
          <div className="column">
            <h2>Activities that describe what I like to do:</h2>
            <div
              className="list-item selected"
              onClick={() => this.toggleBackgroundColor(this)}
            >
              Learn how things grow and stay alive
              <span className="green-tick " style={{ display: "inline" }}>
                &#10004;
              </span>
            </div>
            {/* Repeat the pattern for other activities */}
          </div>
          <div className="column">
            <h2>Personal qualities that describe me:</h2>
            <div
              className="list-item"
              onClick={() => this.toggleBackgroundColor(this)}
            >
              Self-reliant
              <span className="green-tick" style={{ display: "none" }}>
                &#10004;
              </span>
            </div>
            {/* Repeat the pattern for other qualities */}
          </div>
          <div className="column">
            <h2>School subjects that I like:</h2>
            <div
              className="list-item"
              onClick={() => this.toggleBackgroundColor(this)}
            >
              Math
              <span className="green-tick" style={{ display: "none" }}>
                &#10004;
              </span>
            </div>
            {/* Repeat the pattern for other subjects */}
          </div>
        </div>
        <div className="buttons">
          <button>Previous</button>
          <button>Save Progress</button>
          <button>Next</button>
        </div>
      </>
    );
  }
};

export default CareerClusterExam;
