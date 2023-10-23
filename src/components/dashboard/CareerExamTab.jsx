import { Link } from "react-router-dom";

const CareerExamTab = ({ linkTo, examTitle, imgSrc }) => (
  <div className="graph career-exam-tab">
    <Link to={linkTo}>
      <div className="career-exam-card">{examTitle}</div>
      <div className="gif exam-tab">
        <img src={imgSrc} alt="" />
      </div>
    </Link>
  </div>
);

export default CareerExamTab;
