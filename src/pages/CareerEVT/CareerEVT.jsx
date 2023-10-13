import mainLogo from '../../assets/zeapp-logo.png'
import career from '../../assets/career.png'
const CareerEVT = () => {
  const loginData = JSON.parse(localStorage.getItem("userData"))
  const token=localStorage.getItem("token")
  return (
    <div>
      <header>
        <div className="logo">
          <a href="">
            <img src={mainLogo} alt="zeapp-Logo" />
          </a>
        </div>
        <button className="burger-button">&#9776;</button>
        <nav className="main-menu">
          <ul>
            <li>
              <a href="" className="active">
                Home
              </a>
            </li>
            {loginData.view_report === "Y" && <li><a href="">Report</a></li>}

            <li>
              <a href="">Notification</a>
            </li>
            <li>
              <a href="">Profile</a>
            </li>
            <li>
              <a href="">Logout</a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="main-head">
        <h1 className="page-header">Career Evaluation Test</h1>
        <div className="timer">
          <div id="app"></div>
        </div>
      </div>
      <div className="container">
        <div className="column">
          <div className="questions-container bg-blue">
            <p>
              This activity helps you match your interests to different types of
              careers. For each item, select the letter of the activity you would
              rather do
            </p>
          </div>
          <div className="options-wrap">
            <div className="options-container">
              <div className="card">
                <div className="q-no">1</div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    id="option1"
                  />
                  Design indoor sprinkler system
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    id="option2"
                  />
                  Run a factory sewing machine
                </label>
              </div>
            </div>
            <div className="options-container">
              <div className="card">
                <div className="q-no">2</div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    id="option1"
                  />
                  Design indoor sprinkler system
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    id="option2"
                  />
                  Run a factory sewing machine
                </label>
              </div>
            </div>
            <div className="options-container">
              <div className="card">
                <div className="q-no">3</div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    id="option1"
                  />
                  Design indoor sprinkler system
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    id="option2"
                  />
                  Run a factory sewing machine
                </label>
              </div>
            </div>
            <div className="options-container">
              <div className="card">
                <div className="q-no">4</div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    id="option1"
                  />
                  Design indoor sprinkler system
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    id="option2"
                  />
                  Run a factory sewing machine
                </label>
              </div>
            </div>
          </div>
        </div>
        <div
          className="column second-column"
          style={{
            height: 'fit-content',
            textAlign: 'center',
            padding: '8% 10px',
          }}
        >
          <div className="gif">
            <img src={career} alt="" style={{ width: '300px' }} />
          </div>
          <div className="bottom-btn-row">
            <button className="btn btn-red">Quit</button>
            <button className="btn btn-green">Save</button>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-logo">
          <a href="">
            <img src={mainLogo} alt="zeapp-Logo" />
          </a>
        </div>
        <ul className="footer-menu">
          <li>
            <a href="" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="">Report</a>
          </li>
          <li>
            <a href="">Notification</a>
          </li>
          <li>
            <a href="">Profile</a>
          </li>
          <li>
            <a href="">Logout</a>
          </li>
        </ul>
        <div className="app-buttons">
          <button className="app-button">Download on Play Store</button>
          <button className="app-button">Download on App Store</button>
        </div>
      </div>
      <div className="footer2">&copy; 2023 Zeapp All Rights Reserved.</div>
    </div>
    
  );
};

export default CareerEVT;
