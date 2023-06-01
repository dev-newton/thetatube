import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

import { supabase, adminAuthClient } from "../supabaseClient";

import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";

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

const BuyContent = ({ session }) => {
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingVids, setLoadingVids] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  const THETA_API_URL = `https://api.infstones.com/theta/mainnet/8b9f679741e34b38a0fea270d518d9d3/thetacli/rpc`;

  const navigate = useNavigate();

  useEffect(() => {
    getVideos();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getVideos = async () => {
    setLoadingVids(true);
    const { data: mv_data, error: mv_error } = await supabase
      .from("my_videos")
      .select();

    const { data: pv_data, error: pv_error } = await supabase
      .from("purchased_videos")
      .select();

    const notPurchasedVideoss = mv_data.filter(
      (vid) =>
        vid.email !== session?.user.email &&
        !pv_data.some(
          (pv) =>
            pv.buyer_email === session?.user.email &&
            pv.video_url === vid.player_uri
        )
    );

    if (mv_error) {
      console.error(mv_error);
    }

    if (pv_error) {
      console.error(pv_error);
    }

    setLoadingVids(false);
    setVideos(notPurchasedVideoss);
  };

  const sendTheta = (video) => {
    openModal();
    setLoading(true);

    fetch(THETA_API_URL, {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "thetacli.Send",
        params: [
          {
            chain_id: "privatenet",
            from: "0x2E833968E5bB786Ae419c4d13189fB081Cc43bab",
            to: "0xA47B89c94a50C32CEACE9cF64340C4Dce6E5EcC6",
            thetawei: "99000000000000000000",
            tfuelwei: "88000000000000000000",
            fee: "1000000000000",
            sequence: "7",
            async: false,
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
        console.log(data);
      })
      .catch((err) => {
        console.error("error from send theta", err);
        setLoading(false);
      });

    updateBuyerBalance(video);
  };

  const updateBuyerBalance = async (video) => {
    const video_price = video.price * Math.pow(10, 18);
    const theta_wei_balance = Number(
      session?.user.user_metadata.theta_wei_balance
    );
    const tfuel_wei_balance = Number(
      session?.user.user_metadata.tfuel_wei_balance
    );

    const new_theta_wei_balance = theta_wei_balance - video_price;
    const new_tfuel_wei_balance = tfuel_wei_balance - 1000000000000;

    const { data, error } = await supabase.auth.updateUser({
      data: {
        theta_wei_balance: String(new_theta_wei_balance),
        tfuel_wei_balance: String(new_tfuel_wei_balance),
      },
    });

    if (error) {
      setLoading(false);
      return console.log("error from update buyer", error);
    }
    updateSellerBalance(video);
  };

  const updateSellerBalance = async (video) => {
    const video_price = video.price * Math.pow(10, 18);

    const {
      data: { users },
      error: userError,
    } = await adminAuthClient.listUsers();

    if (userError) {
      setLoading(false);
      return console.log("error from list users", error);
    }

    const seller = users.find((user) => user.email === video.email);

    const theta_wei_balance = Number(seller?.user_metadata.theta_wei_balance);

    const new_theta_wei_balance = theta_wei_balance + video_price;

    const { data: user, error } = await adminAuthClient.updateUserById(
      seller?.id,
      {
        user_metadata: {
          theta_wei_balance: String(new_theta_wei_balance),
        },
      }
    );

    if (error) {
      setLoading(false);
      return console.log("error from update seller", error);
    }

    saveToPurchased(video);
  };

  const saveToPurchased = async (video) => {
    const { error } = await supabase.from("purchased_videos").insert({
      buyer_email: session?.user.email,
      video_url: video.player_uri,
      video_author_name: video.created_by,
      title: video.title,
      price: video.price,
    });

    if (error) {
      setLoading(false);
      return console.log("error from save purchased", error);
    }

    setLoading(false);
    closeModal();
    toast.success("Purchase successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      progress: undefined,
    });

    navigate("/purchased-content");
  };

  return (
    <>
      <Navbar />
      <div className="buy-content">
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
                <h2>Purchase in progress...</h2>
              </>
            ) : null}
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
                    onClick={() => sendTheta(vid)}
                    label={
                      loading ? "Please wait..." : `PAY - ${vid.price} Theta`
                    }
                    withButton
                    title={vid.title}
                    author={vid.created_by}
                  />
                </Fragment>
              ))
            : null}
        </div>

        {!loadingVids && !videos.length ? (
          <h2 style={{ textAlign: "center" }}>No Videos have been uploaded!</h2>
        ) : null}
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

export default BuyContent;
