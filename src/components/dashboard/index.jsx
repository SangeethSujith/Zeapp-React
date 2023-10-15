import { Link, useNavigate } from "react-router-dom";
import career from "../../assets/images/career.png";
import { routepath } from "../../constants/routepath";
import SideMenu from "../shared/sideMenu";
import { userData } from "../../utils/loginData";
import { endpoints } from "../../constants/endpoints";
import { useEffect, useState } from "react";
import Axios from "axios";
import qs from "qs";

const Dashboard = () => {
  const { first_name, school_name, access_token } = userData;
  const [exams, setExams] = useState({});
  console.log("exams", exams);
  useEffect(() => {
    getDashBoardExams(access_token);
  }, []);

  const getDashBoardExams = async (token) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.getAssignedExams}`,
        qs.stringify({ access_key: token })
      );
      setExams(response.data);
    } catch (error) {
      console.error("Error Getting Exams:", error);
    }
  };

  return (
    <div className="center">
      <SideMenu />
      <div className="right">
        <div className="row column">
          <div className="graph">
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
        <div className="row column">
          {exams.CAREER === "CAREER_CLUSTER" && (
            <div className="graph">
              <Link to={routepath.careerEvaluationExam}>
                <div className="career-exam-card">Take Career Test</div>
              </Link>
            </div>
          )}
          {exams.EXAM && (
            <div className="graph">
              <Link to={routepath.reasoningExam}>
                <div className="career-exam-card">Take Reasoning Test</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
