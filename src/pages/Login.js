import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "../components/Input/Input";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // const authenticate = (data) => {
  //   if (data.email !== "newton@test.com" || data.password !== "123456") {
  //     return toast.error("Email/Password is icorrect", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       pauseOnFocusLoss: false,
  //       progress: undefined,
  //     });
  //   }

  //   localStorage.token = process.env.REACT_APP_AUTH_TOKEN;
  //   setTimeout(triggerLogout, 600000);
  //   props.history.push("/dashboard");
  // };

  // const triggerLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/";
  //   alert("Your token has expired, please login again");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    navigate("/profile");
  };

  return (
    <div className="login-bg">
      <div className="login-wrapper">
        <h1 className="header-nav lg">ThetaTube</h1>
        <div className="form-wrapper">
          <b>
            Kindly login with Email:<span>testuser@gmail.com</span> and
            password:
            <span>test</span>
          </b>
          <h3 className="header-nav log">Login</h3>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="btn-wrapper">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
            <p>
              Don't have an account yet? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer
        className="toast-container"
        bodyClassName="toast-class"
        style={{ marginTop: 100, color: "dark" }}
        autoClose={true}
      />
    </div>
  );
};

export default Login;
