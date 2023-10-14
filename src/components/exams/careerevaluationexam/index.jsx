import career from "../../../assets/images/career.png";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import Timer from "../../shared/Timer";
import useBeforeUnload from "../../../utils/hooks/useBeforeUnload";
const CareerEvaluationExam = () => {
  useBeforeUnload("Are you sure you want to leave this page?");
  const loginData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");
  return (
    <div>
      <Header />
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
              careers. For each item, select the letter of the activity you
              would rather do
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
            height: "fit-content",
            textAlign: "center",
            padding: "8% 10px",
          }}
        >
        <Timer/>
          <div className="gif">
            <img src={career} alt="" style={{ width: "300px" }} />
          </div>
          <div className="bottom-btn-row">
            <button className="btn btn-red">Quit</button>
            <button className="btn btn-green">Save</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareerEvaluationExam;
