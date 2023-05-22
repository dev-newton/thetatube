import React from "react";

const InvoiceRow = ({ left, right }) => {
  return (
    <div className="invoice-row">
      <p>{left}:</p>
      <h3>
        <span className="success"></span>
        {right}
      </h3>
    </div>
  );
};

export default InvoiceRow;
