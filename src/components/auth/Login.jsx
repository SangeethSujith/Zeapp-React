import { useForm } from "react-hook-form";
import Axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../constants/endpoints";
import { routepath } from "../../constants/routepath";
import notificationHelpers from "../../utils/notification";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
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
      notificationHelpers.error("Something Went Wrong!")
      console.error("Error sending POST request:", error);
    }
  };
  return (
    <>
      <Header isMenuHidden={true} />
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
      <Footer />
    </>
  );
};

export default Login;
