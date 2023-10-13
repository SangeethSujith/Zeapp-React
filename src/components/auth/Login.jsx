import { useForm } from "react-hook-form";
import Axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../constants/endpoints";
import { routepath } from "../../constants/routepath";
import notificationHelpers from "../../utils/notification";
import Header from "../shared/Header";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log("errors", errors);
  const onSubmit = async (data) => {
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL + endpoints.login}`,
        qs.stringify(data)
      );
      if (response.data.status === "success") {
        localStorage.setItem("userData", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.access_token);
        navigate(routepath.dashboard);
      } else {
        notificationHelpers.error(response.data.message);
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };
  return (
    <>
      <Header loginPage={true} />
      <section className="main-section">
        <div className="main-head"></div>
        <div id="login" className="login-container">
          <div className="login-card">
            <div className="close-btn"></div>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="login-card-head">
                <h1>Login</h1>
              </div>
              <input
                type="text"
                className="login-input"
                placeholder="Username"
                name="username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <div className="incorrect">Incorrect username</div>
              )}
              <input
                type="password"
                className="login-input"
                placeholder="Password"
                name="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <div className="incorrect">Incorrect password</div>
              )}
              {/* <div className="forgot-pswd">
                                <a href="">Forgot password</a>
                            </div> */}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
      <div className="footer">
        <div className="footer-logo">
          <a href="">
            <img
              src="../../../src/assets/images/zeapp-logo.png"
              alt="zeapp-Logo"
            />
          </a>{" "}
        </div>
        <div className="app-buttons">
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.udyata.myapps.zeapp&pli=1"
          >
            <button className="app-button">Download on Play Store</button>
          </a>
          <button className="app-button">Download on App Store</button>
        </div>
      </div>
      <div className="footer2">&copy; 2023 Zeapp All Rights Reserved.</div>
    </>
  );
};

export default Login;
