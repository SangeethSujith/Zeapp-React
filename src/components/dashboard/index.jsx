import { Link, useNavigate } from "react-router-dom";
import career from "../../assets/images/career.png";
import { routepath } from "../../constants/routepath";
import SideMenu from "../shared/sideMenu";
const Dashboard = () => {
  const loginData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div className="center">
      <SideMenu />
      <div className="right">
        <div className="row column">
          <div className="graph">
            <div className="column">
              <div className="title">
                Hello, {loginData.first_name} from {loginData.school_name}
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
          <div className="graph">
            <Link to={routepath.careerEvaluationExam}>
              <div className="career-exam-card">Take Career Test</div>
            </Link>
          </div>
          <div className="graph">
            <Link to={routepath.reasoningExam}>
              <div className="career-exam-card">Take Reasoning Test</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
