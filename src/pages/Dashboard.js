import React, { Fragment, useEffect, useState } from "react";
import { ImHome3, ImVideoCamera } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";

import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

import { supabase } from "../supabaseClient";
import Input from "../components/Input/Input";
import { redirect, useNavigate } from "react-router-dom";

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

const customStyles1 = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    border: "none",
    width: "535px",
    padding: "0",
  },
  overlay: {
    zIndex: 33,
  },
};

const Dashboard = () => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingVids, setLoadingVids] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen1, setIsOpen1] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [currentVid, setCurrentVid] = useState("");

  // const [session, setSession] = useState(null);
  const session = JSON.parse(localStorage.getItem("session"));

  // console.log(JSON.parse(localStorage.getItem("session")));

  const { REACT_APP_API_URL } = process.env;

  const navigate = useNavigate();

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setLoadingVids(true);
    const { data, error } = await supabase.from("my_videos").select();

    if (error) {
      setLoadingVids(false);
      return console.log(error);
    }

    setLoadingVids(false);

    setVideos(data.filter((vid) => vid.email === session?.user.email));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal1 = () => {
    setIsOpen1(true);
  };

  const closeModal1 = () => {
    setIsOpen1(false);
  };

  const openModal2 = () => {
    setIsOpen2(true);
  };

  const closeModal2 = () => {
    setIsOpen2(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const openvid = (player_uri) => {
    setCurrentVid(player_uri);
    openModal2();
  };

  const handleUploadClick = () => {
    if (!title) {
      return toast.error("Title cannot be empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        progress: undefined,
      });
    }

    if (!file) {
      return toast.error("No file selected, please select a file!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        progress: undefined,
      });
    }

    closeModal1();
    openModal();
    setLoading(true);

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
        postVideo(title, data.data[0].player_uri);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const postVideo = async (title, player_uri) => {
    console.log("here 2");
    const { error } = await supabase.from("my_videos").insert({
      title,
      price,
      player_uri,
      created_by: session?.user.user_metadata.name,
      email: session?.user.email,
    });

    if (error) {
      setLoading(false);
      return console.log(error);
    }

    setLoading(false);
    openvid(player_uri);
    closeModal();
    getVideos();
    return toast.success("Upload successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      progress: undefined,
    });
  };

  // if (!session) {
  //   navigate("/");
  // }

  return (
    <>
      {/* {session && ( */}
      <>
        {console.log(222, videos)}
        <Navbar />
        <div className="dashboard">
          <div className="top">
            <div className="left-pane">
              <p>
                Name: <b>{session?.user.user_metadata.name}</b>
              </p>
              <br />
              <p>
                Email: <b>{session?.user.email}</b>
              </p>
              <br />
              <p>
                Theta Address:{" "}
                <b>{session?.user.user_metadata.theta_address}</b>
              </p>
              <br />
              <p>
                ThetaWei:
                <b>
                  {Number(
                    session?.user.user_metadata.theta_wei_balance
                  ).toLocaleString()}
                </b>
              </p>
              <br />
              <p>
                TFuelWei:
                <b>
                  {Number(
                    session?.user.user_metadata.tfuel_wei_balance
                  ).toLocaleString()}
                </b>
              </p>
            </div>
          </div>
          <div className="bottom">
            <div className="btn-wrapper">
              <div></div>
              <Button label="Upload new video" onClick={openModal1} />
            </div>
            <Modal
              isOpen={modalIsOpen1}
              onRequestClose={closeModal1}
              style={customStyles1}
              contentLabel="Example Modal"
              shouldCloseOnOverlayClick={false}
            >
              <div className="modall-form">
                <h2>Upload new video</h2>
                <Input
                  label="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  label="Price (Theta)"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label className="label" style={{ display: "block" }}>
                  Video:
                </label>
                <label className="custom-file-upload">
                  <input type="file" onChange={handleFileChange} />
                  Select video
                </label>
                &nbsp;
                {file ? file.name : null}
                <br /> <br />
                <br />
                <Button
                  style={{ width: "100%" }}
                  label="Upload"
                  onClick={handleUploadClick}
                />
              </div>
            </Modal>
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
                    <div className="lds-spinner">
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
              </div>
            </Modal>
            <Modal
              isOpen={modalIsOpen2}
              onRequestClose={closeModal2}
              style={customStyles}
              contentLabel="Example Modal"
              shouldCloseOnOverlayClick={false}
            >
              <div className="modall">
                <AiOutlineClose className="close-icon" onClick={closeModal2} />
                <iframe
                  src={currentVid}
                  frameBorder="0"
                  allowFullScreen
                  className="iframe"
                ></iframe>
              </div>
            </Modal>
            {loadingVids && !videos.length ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div className="lds-spinner">
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
              </div>
            ) : null}
            <div className="content">
              {videos.length
                ? videos.map((vid, i) => (
                    <Fragment key={i}>
                      <Card
                        onClick={() => openvid(vid.player_uri)}
                        title={vid.title}
                        author={vid.created_by}
                        price={vid.price}
                      />
                    </Fragment>
                  ))
                : null}
            </div>

            {!loadingVids && !videos.length ? (
              <h2 style={{ textAlign: "center" }}>
                No Videos have been uploaded!
              </h2>
            ) : null}
          </div>
        </div>
      </>
      {/* // )} */}
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
