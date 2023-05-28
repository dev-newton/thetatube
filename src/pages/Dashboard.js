import React, { useEffect, useState } from "react";
import { ImVideoCamera } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";

const Dashboard = () => {
  const [file, setFile] = useState();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isOpen, setOpen] = useState(false);

  const { REACT_APP_API_URL } = process.env;

  useEffect(() => {
    handleUploadClick();
  }, [file]);

  const videosLocal =
    localStorage.getItem("videos") &&
    JSON.parse(localStorage.getItem("videos"));

  useEffect(() => {
    if (videosLocal) {
      setVideos(videosLocal);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    setLoading(true);
    if (!file) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("theta-api-key", "srvacc_cc55yrv86dh8x5n2wygu4ipm1");
    formData.append("theta-api-secret", "p5v3sz7tmkxh2zv7027g0sm2t94sc6vh");
    formData.append("async-flow", "false");
    formData.append(
      "webhook-url",
      "https://webhook.site/55552332-e7b6-475e-b767-db8d563a8428"
    );
    formData.append("files", file);

    // 👇 Uploading the file using the fetch API to the server
    fetch(REACT_APP_API_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        setVideos(data.data);
        localStorage.setItem("videos", JSON.stringify(data.data));
        return toast.success("Upload successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          progress: undefined,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="top">
          <div className="left-pane">
            <p>
              Name: <b>Test User</b>
            </p>
            <br />
            <p>
              Email: <b>testuser@gmail.com</b>
            </p>
            <br />
            <p>
              Theta Address: <b>0x2E833968E5bB786Ae419c4d13189fB081Cc43bab</b>
            </p>
            <br />
            <p>
              ThetaWei: <b>994999990000000000000000000</b>
            </p>
            <br />
            <p>
              TFuelWei: <b>4999999979999999000000000000</b>
            </p>
          </div>
        </div>
        <div className="bottom">
          <div className="btn-wrapper">
            <div></div>
            <label class="custom-file-upload">
              <input type="file" onChange={handleFileChange} />
              {loading ? "Uploading..." : "Upload new content"}
            </label>
          </div>

          <div className="content">
            {videos.length ? (
              <Card
                onClick={() => window.open(videos[0].player_uri, "_blank")}
                title={videos[0].id.slice(6, 10)}
              />
            ) : null}
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>

      <ToastContainer
        className="toast-container"
        bodyClassName="toast-class"
        style={{ marginTop: 100, color: "dark" }}
        autoClose={true}
      />
    </>
  );
};

export default Dashboard;
