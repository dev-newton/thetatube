import React from "react";

import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";

const BuyContent = () => {
  return (
    <>
      <Navbar />
      <div className="buy-content">
        <div className="content">
          <Card label="PAY - 2 Theta" withButton />
          <Card label="PAY - 1.5 Theta" withButton />
          <Card label="PAY - 4 Theta" withButton />
          <Card label="PAY - 7.9 Theta" withButton />
          <Card label="PAY - 1.2 Theta" withButton />
          <Card label="PAY - 0.66 Theta" withButton />
          <Card label="PAY - 7.56 Theta" withButton />
          <Card label="PAY - 14.234 Theta" withButton />
        </div>
      </div>
    </>
  );
};

export default BuyContent;
