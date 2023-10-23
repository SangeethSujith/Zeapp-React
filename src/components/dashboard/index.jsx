import career from "../../assets/images/career.png";
import { userData } from "../../utils/loginData";
import { endpoints } from "../../constants/endpoints";
import { useEffect, useState } from "react";
import exam_career from "../../assets/images/exam-career.png";
import exam_reasoning from "../../assets/images/exam-reas.png";
import Axios from "axios";
import qs from "qs";
import { CareerExams, ReasoningExam } from "../../constants/exams";
import CareerExamTab from "./CareerExamTab";
import ReasoningExamTab from "./ReasoningExamTabl";

const Dashboard = () => {
  const { first_name, school_name, access_token } = userData;
  const [exams, setExams] = useState({});
  useEffect(() => {
    getDashBoardExams(access_token);
  }, []);

  const getDashBoardExams = async (token) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.getAssignedExams}`,
        qs.stringify({ access_key: token })
      );
      if (response.data.status === "ERROR") {
        localStorage.clear();
        window.location.reload();
      } else {
        setExams(response.data);
      }
    } catch (error) {
      console.error("Error Getting Exams:", error);
    }
  };

  return (
    <div className="center">
      <div>
        <div className="row column">
          <div className="graph welcome-banner">
            <div className="column">
              <div className="title">
                Hello, {first_name} from {school_name}
              </div>
              <div className="description">Welcome to Zeapp...</div>
            </div>
            <div className="column">
              <div className="gif">
                <img src={career} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="row column dashboard-exam-tabs">
          {/* Career Exams */}
          {CareerExams.map(
            (exam) =>
              exams.CAREER === exam.key && (
                <CareerExamTab
                  key={exam.key}
                  linkTo={exam.route}
                  examTitle={exam.title}
                  imgSrc={exam_career}
                />
              )
          )}
          {/* Reasoning Exam */}
          {exams.EXAM && (
            <ReasoningExamTab
              title={ReasoningExam.title}
              routepath={ReasoningExam.route}
              examData={exams.EXAM[0]}
              imgSrc={exam_reasoning}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
