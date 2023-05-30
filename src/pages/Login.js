import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../components/Input/Input";

import { supabase } from "../supabaseClient";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      console.log("ERROR:", error.message);
      return toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        progress: undefined,
      });
    }
    setLoading(false);
    toast.success("Login successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      progress: undefined,
    });

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
                {loading ? "Please wait..." : "Login"}
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
