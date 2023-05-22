import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card as Card_ } from "antd";
const { Meta } = Card_;

const Card = ({ label, withButton = false }) => (
  <Card_
    hoverable
    style={{ position: "relative" }}
    cover={
      <img
        alt="example"
        src="https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
    }
    // actions={[
    //   <SettingOutlined key="setting" />,
    //   <EditOutlined key="edit" />,
    //   <EllipsisOutlined key="ellipsis" />,
    // ]}
  >
    <Meta title="Video title 1" description="Author: Test Author" />
    {withButton && <button className="btn-card">{label}</button>}
  </Card_>
);
export default Card;
