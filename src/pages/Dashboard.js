import React from "react";
import { ImVideoCamera } from "react-icons/im";

import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";

const Dashboard = () => {
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
            <Button label="Upload new content" />
          </div>

          <div className="content">
            <Card />
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
    </>
  );
};

export default Dashboard;
