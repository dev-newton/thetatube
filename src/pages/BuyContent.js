import React from "react";

import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";

const BuyContent = () => {
  return (
    <>
      <Navbar />
      <div className="buy-content">
        <div className="content">
          <Card label="PAY $22" withButton />
          <Card label="PAY $15" withButton />
          <Card label="PAY $4" withButton />
          <Card label="PAY $19" withButton />
          <Card label="PAY $12" withButton />
          <Card label="PAY $10" withButton />
          <Card label="PAY $7" withButton />
          <Card label="PAY $14" withButton />
        </div>
      </div>
    </>
  );
};

export default BuyContent;
