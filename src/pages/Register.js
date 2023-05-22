import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "../components/Input/Input";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <div className="login-bg">
      <div className="login-wrapper">
        <h1 className="header-nav lg">ThetaTube</h1>
        <div className="form-wrapper">
          <h3 className="header-nav">Register</h3>
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
                Register
              </button>
            </div>
            <p>
              Already have an account yet? <Link to="/">Login</Link>
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

export default Register;
