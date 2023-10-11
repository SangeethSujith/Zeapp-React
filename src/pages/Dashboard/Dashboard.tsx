import mainLogo from '../../assets/zeapp-logo.png';
import career from '../../assets/career.png'
const Dashboard = () => {
  return (
    <div className="center">
      <div className="left">
        <div className="company">
          <div className="logo">
            <img src={mainLogo} alt="main" />
          </div>
        </div>
        <div className="navigation">
          <ul>
            <li><a href="" className="active">Home</a></li>
            <li><a href="">Report</a></li>
            <li><a href="">Notification</a></li>
            <li><a href="">Profile</a></li>
            <li><a href="">Logout</a></li>
          </ul>
        </div>
      </div>
      <div className="right">
        <div className="row column">
          <div className="graph">
            <div className="column">
              <div className="title">Hello, Zeapp-RIA-12 Student1</div>
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
            <a href="career-test.html">
              <div className="career-exam-card">
                Take Career Test
              </div>
            </a>
          </div>
          <div className="graph">
            <a href="reasoning-test.html">
              <div className="career-exam-card">
                Take Reasoning Test
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
