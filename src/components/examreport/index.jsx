import React, { useEffect, useState } from "react";
import { endpoints } from "../../constants/endpoints";
import { userData } from "../../utils/loginData";
import Axios from "axios";
import qs from "qs";
const ExamReport = () => {
  const [isReportAvailable, setisReportAvailable] = useState(null);
  const { access_token } = userData;
  useEffect(() => {
    checkIsReportAvailable(access_token);
  }, []);

  const checkIsReportAvailable = async (token) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.canUserPullReport}`,
        qs.stringify({ access_key: token })
      );
      if (response.data.status === "ERROR") {
        localStorage.clear();
        window.location.reload();
      } else {
        const pull_report = response.data.pull_report === "Y" ? true : false;
        setisReportAvailable(pull_report);
      }
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
    <div 
    // style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center"}}
    style={{display:"flex", height:"80%",justifyContent:"center",alignItems:"center"}}
    >
      <div>
        {isReportAvailable ? (
          <button style={{width:300,height:50, backgroundColor:"#5546e9", borderRadius:10}} onClick={() => handleDownloadReport(access_token)}>
           <span style={{color:"white",fontSize:18}}> Download Report </span>
          </button>
        ) : (
          <h1>
            Report not ready yet. Please complete the exams and check again.
          </h1>
        )}
      </div>
    </div>
  );
};

export default ExamReport;
