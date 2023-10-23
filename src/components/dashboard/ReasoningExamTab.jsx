import React from "react";
import { Link } from "react-router-dom";

const ReasoningExamTab = ({ routepath, examData, title, imgSrc }) => (
  <div className="graph reason-exam-tab">
    <Link to={`${routepath}/${examData.quid}/${examData.duration}`}>
      <div className="career-exam-card">{title}</div>
      <div className="gif exam-tab">
        <img src={imgSrc} alt="" />
      </div>
    </Link>
  </div>
);

export default ReasoningExamTab;
