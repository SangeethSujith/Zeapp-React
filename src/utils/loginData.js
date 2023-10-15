const userLocalData = JSON.parse(localStorage.getItem("userData")) || {};

export const userData = {
  view_report: userLocalData.view_report || "",
  pull_report: userLocalData.pull_report || "",
  message: userLocalData.message || "",
  access_token: userLocalData.access_token || "",
  first_name: userLocalData.first_name || "",
  last_name: userLocalData.last_name || "",
  contact_no: userLocalData.contact_no || "",
  school_name: userLocalData.school_name || "",
  school_address: userLocalData.school_address || "",
  school_email: userLocalData.school_email || "",
  school_phone: userLocalData.school_phone || "",
  http_code: userLocalData.http_code || 200,
};
