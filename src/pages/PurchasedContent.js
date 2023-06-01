import { useEffect, useState, Fragment } from "react";
import Modal from "react-modal";

import Card from "../components/Card/Card";
import Navbar from "../components/Navbar/Navbar";

import { supabase } from "../supabaseClient";
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
    backgroundColor: "#252a33",
    color: "#fff !important",
  },
  overlay: {
    zIndex: 33,
    backgroundColor: "#1e222ae8",
  },
};

const PurchasedContent = () => {
  const [videos, setVideos] = useState([]);
  const [loadingVids, setLoadingVids] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [currentVid, setCurrentVid] = useState("");

  const session = JSON.parse(localStorage.getItem("session"));

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setLoadingVids(true);

    const { data: pv_data, error: pv_error } = await supabase
      .from("purchased_videos")
      .select();

    const purchasedVideos = pv_data.filter(
      (vid) => vid.buyer_email === session?.user.email
    );

    if (pv_error) {
      console.error(pv_error);
    } else {
      console.log(purchasedVideos);
      setVideos(purchasedVideos);
    }
    setLoadingVids(false);
  };

  const openModal2 = () => {
    setIsOpen2(true);
  };

  const closeModal2 = () => {
    setIsOpen2(false);
  };

  const openvid = (player_uri) => {
    setCurrentVid(player_uri);
    openModal2();
  };

  return (
    <>
      <Navbar />
      <div className="purchased-content">
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
                    onClick={() => openvid(vid.video_url)}
                    title={vid.title}
                    author={vid.video_author_name}
                    price={vid.price}
                  />
                </Fragment>
              ))
            : null}
        </div>

        {!loadingVids && !videos.length ? (
          <h2 style={{ textAlign: "center" }}>
            No Videos have been purchased!
          </h2>
        ) : null}
      </div>
    </>
  );
};

export default PurchasedContent;
