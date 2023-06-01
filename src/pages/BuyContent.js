import { supabase } from "../supabaseClient";

import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import { useEffect, useState, Fragment } from "react";

const BuyContent = ({ session }) => {
  const [videos, setVideos] = useState([]);
  const [loadingVids, setLoadingVids] = useState(false);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setLoadingVids(true);
    const { data: mv_data, error: mv_error } = await supabase
      .from("my_videos")
      .select();

    const { data: pv_data, error: pv_error } = await supabase
      .from("purchased_videos")
      .select();

    const otherVideos = mv_data.filter(
      (vid) => vid.email !== session?.user.email
    );

    const purchasedVideos = pv_data.filter(
      (vid) => vid.buyer_email === session?.user.email
    );

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
    // else {
    //   console.log(otherVideos);
    // }

    if (pv_error) {
      console.error(pv_error);
    }
    //  else {
    //   console.log(purchasedVideos);
    // }
    setLoadingVids(false);

    setVideos(notPurchasedVideoss);
    // console.log(notPurchasedVideoss);
  };
  return (
    <>
      <Navbar />
      <div className="buy-content">
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
                    // onClick={() => openvid(vid.player_uri)}
                    label={`PAY - ${vid.price} Theta`}
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
    </>
  );
};

export default BuyContent;
