import React, { useEffect, useState } from "react";
import SideMenu from "../shared/sideMenu";
import { endpoints } from "../../constants/endpoints";
import { userData } from "../../utils/loginData";
import Axios from "axios";
import qs from "qs";
const ExamReport = () => {
  const [isReportAvailable, setisReportAvailable] = useState(null);
  const { access_token } = userData;
  console.log("isReportAvailable", isReportAvailable);
  useEffect(() => {
    checkIsReportAvailable(access_token);
  }, []);

  const checkIsReportAvailable = async (token) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.canUserPullReport}`,
        qs.stringify({ access_key: token })
      );
      const pull_report = response.data.pull_report === "Y" ? true : false;
      console.log("pull_report", pull_report);
      setisReportAvailable(pull_report);
    } catch (error) {
      console.error("Error Getting Exams:", error);
    }
  };

  const handleDownloadReport = async (token) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.getALLReportGroup}`,
        qs.stringify({ access_key: token })
      );
      if (response) {
        const report_id = response.data.data[0].id;
        const report_pull_url = `http://13.235.29.97:8080/zeapp/report/generateReportForApi?access_token=${token}&report_mastr=${report_id}`;
        window.open(report_pull_url, "_blank");
      }
    } catch (error) {
      console.error("Error Getting Exams:", error);
    }
  };

  return (
    <div className="center">
      <div className="right">
        {isReportAvailable ? (
          <button onClick={() => handleDownloadReport(access_token)}>
            download report
          </button>
        ) : (
          <h1>report not available</h1>
        )}
      </div>
    </div>
  );
};

export default ExamReport;
