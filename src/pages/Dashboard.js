import React, { useEffect, useState } from "react";
import { ImVideoCamera } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";

import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    border: "none",
    width: "935px",
    padding: "0",
  },
  overlay: {
    zIndex: 33,
  },
};

const Dashboard = () => {
  const [file, setFile] = useState();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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

  const openvid = () => {
    openModal();
  };

  const handleUploadClick = () => {
    setLoading(true);
    if (!file) {
      setLoading(false);
      return;
    }

    openModal();

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
      {console.log(222, file)}
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
              Upload new content
            </label>
          </div>
          {/* 
          <button onClick={openModal}>Open Modal</button> */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick={false}
          >
            <div className="modall">
              {loading ? (
                <>
                  <div class="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <h2>Upload in progress...</h2>
                </>
              ) : null}
              <AiOutlineClose className="close-icon" onClick={closeModal} />
              {!loading && videos.length ? (
                <iframe
                  src={videos[0].player_uri}
                  frameborder="0"
                  allowFullScreen
                  className="iframe"
                ></iframe>
              ) : null}
            </div>
          </Modal>

          <div className="content">
            {videos.length ? (
              <Card onClick={openvid} title={videos[0].id.slice(6, 10)} />
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
