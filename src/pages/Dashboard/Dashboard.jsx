import { Link, useNavigate } from 'react-router-dom';
import career from '../../assets/career.png';
import { routepath } from '../../constants/routepath';
const Dashboard = () => {
    const loginData = JSON.parse(localStorage.getItem("userData"))
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    return (
        <div className="center">
            <div className="left">
                <div className="company">
                    <div className="logo">
                        <img src='../../assets/zeapp-logo.png' alt="main" />
                    </div>
                </div>
                <div className="navigation">
                    <ul>
                        <li><a href="" className="active">Home</a></li>
                        {loginData.view_report === "Y" && <li><a href="">Report</a></li>}
                        <li><a href="">Notification</a></li>
                        <li><a href="">Profile</a></li>
                        <li><a href="#" onClick={() => { localStorage.clear(); navigate(routepath.login) }}>Logout</a></li>
                    </ul>
                </div>
            </div>
            <div className="right">
                <div className="row column">
                    <div className="graph">
                        <div className="column">
                            <div className="title">Hello, {loginData.first_name} from {loginData.school_name}</div>
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
                        <Link to={routepath.careerEVT} >
                            <div className="career-exam-card">
                                Take Career Test
                            </div>
                        </Link>
                    </div>
                    <div className="graph">
                        <Link to={routepath.reasoning} >
                            <div className="career-exam-card">
                                Take Reasoning Test
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
