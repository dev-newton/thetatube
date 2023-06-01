import { Card as Cardd } from "antd";
import { BsPlayCircle, BsLockFill } from "react-icons/bs";

const { Meta } = Cardd;

const Card = ({ label, withButton = false, title, author, price, onClick }) => (
  <Cardd
    onClick={onClick}
    hoverable
    style={{ position: "relative" }}
    cover={
      <div className="card-cover">
        {withButton ? (
          <BsLockFill className="lock-icon" />
        ) : (
          <BsPlayCircle className="play-icon" />
        )}
      </div>
    }
  >
    <Meta
      title={title}
      description={`Author: ${author}`}
      style={{ fontSize: 16 }}
    />
    {price && (
      <p
        style={{
          paddingLeft: 24,
          color: "#fff",
          fontSize: 16,
        }}
      >
        Price: {price} Theta
      </p>
    )}
    <div style={{ paddingBottom: 15 }}></div>
    {withButton && <button className="btn-card">{label}</button>}
  </Cardd>
);
export default Card;
