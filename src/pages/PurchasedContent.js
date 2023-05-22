import React from "react";
import Card from "../components/Card/Card";
import Navbar from "../components/Navbar/Navbar";

const PurchasedContent = () => {
  return (
    <>
      <Navbar />
      <div className="purchased-content">
        <div className="content">
          <Card label="VIEW" withButton />
          <Card label="VIEW" withButton />
          <Card label="VIEW" withButton />
          <Card label="VIEW" withButton />
          <Card label="VIEW" withButton />
          <Card label="VIEW" withButton />
          <Card label="VIEW" withButton />
          <Card label="VIEW" withButton />
        </div>
      </div>
    </>
  );
};

export default PurchasedContent;
