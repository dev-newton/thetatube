import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../components/Input/Input";

import { supabase } from "../supabaseClient";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const THETA_API_URL = `https://api.infstones.com/theta/mainnet/8b9f679741e34b38a0fea270d518d9d3/thetacli/rpc`;

  const generateRandomNumber = () =>
    Math.floor(Math.random() * 9) +
    1 +
    String(Math.floor(Math.random() * 10 ** 20)).padStart(20, "0");

  const createNewKey = (e) => {
    e.preventDefault();

    setLoading(true);

    fetch(THETA_API_URL, {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "thetacli.NewKey",
        params: [{ password: "qwertyuiop" }],
        id: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        unlockKey(data.result.address);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const unlockKey = (address) => {
    fetch(THETA_API_URL, {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "thetacli.UnlockKey",
        params: [
          {
            address,
            password: "qwertyuiop",
          },
        ],
        id: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        handleSubmit(address);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const handleSubmit = async (address) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          theta_address: address,
          theta_wei_balance: generateRandomNumber(),
          tfuel_wei_balance: generateRandomNumber(),
        },
      },
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
    toast.success("Registration successful!", {
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
          <h3 className="header-nav log">REGISTER</h3>
          <form onSubmit={createNewKey}>
            <Input
              label="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
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
                {loading ? "Please wait..." : "Register"}
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
