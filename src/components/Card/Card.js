import { Card as Cardd } from "antd";
const { Meta } = Cardd;

const Card = ({ label, withButton = false, title, author, price, onClick }) => (
  <Cardd
    onClick={onClick}
    hoverable
    style={{ position: "relative" }}
    cover={
      <img
        alt="example"
        src="https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
    }
  >
    <Meta
      title={title}
      description={`Author: ${author}`}
      style={{ fontSize: 16 }}
    />
    {price && (
      <p
        style={{ paddingLeft: 24, color: "rgba(0, 0, 0, 0.45)", fontSize: 16 }}
      >
        Price: {price} Theta
      </p>
    )}
    <div style={{ paddingBottom: 15 }}></div>
    {withButton && <button className="btn-card">{label}</button>}
  </Cardd>
);
export default Card;
