import React from 'react'

const ReasoningTest = () => {
  return (
    <div>
      <div>
        <div className="logo">
          <a href="">
            <img src="zeapp-logo.png" alt="zeapp-Logo" />
          </a>
        </div>
        <nav className="menu">
          <ul>
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
        </nav>
        <button className="burger-button">&#9776;</button>
        <nav className="main-menu">
          <ul>
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
        </nav>
      </div>
      <div className="main-head" style={{ display: 'flex' }}>
        <h1 className="page-header">Career Evaluation Test</h1>
        <div className="timer">
          <div id="app"></div>
        </div>
      </div>
      <div className="container">
        <div className="column">
          <div className="questions-container">
            <div className="container-head">Question 1 :</div>
            <p>Study the figure below and answer the following questions</p>
            <img src="test-image-question.png" alt="" />
            <ul className="questions-list">
              <li>Find out the number of families which have all the four things mentioned in the diagram</li>
            </ul>
          </div>
          <div className="options-container">
            <div className="options-head">Options :</div>
            <ul className="options-list">
              <li>
                Option 1 <input type="radio" className="radio-button" />
              </li>
              <li>
                Option 2 <input type="radio" className="radio-button" />
              </li>
            </ul>
          </div>
          <div className="bottom-btn-row">
            <button className="btn btn-blue">Previous</button>
            <button className="btn btn-blue">Next</button>
            <button className="btn btn-red">Quit</button>
            <button className="btn btn-green">Save</button>
          </div>
        </div>
        <div className="column second-column">
          <div className="button-row"></div>
          <div className="color-indicator">
            <div className="color-box-wrap">
              <div className="color-box" style={{ backgroundColor: '#53d380' }}></div>
              <div className="color-caption">Answered</div>
            </div>
            <div className="color-box-wrap">
              <div className="color-box" style={{ backgroundColor: '#f57572' }}></div>
              <div className="color-caption">Unanswered</div>
            </div>
            <div className="color-box-wrap">
              <div className="color-box" style={{ backgroundColor: '#f8b551' }}></div>
              <div className="color-caption">Review-later</div>
            </div>
            <div className="color-box-wrap">
              <div className="color-box" style={{ backgroundColor: '#249ef2' }}></div>
              <div className="color-caption">Not-visited</div>
            </div>
          </div>
          <div className="textarea-row" style={{ display: 'none' }}>
            <textarea placeholder="Enter text"></textarea>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-logo">
          <a href="">
            <img src="zeapp-logo.png" alt="zeapp-Logo" />
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
  )
}

export default ReasoningTest;