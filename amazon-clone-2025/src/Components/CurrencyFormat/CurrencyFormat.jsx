import numeral from "numeral";
import React from "react";

const CurrencyFormat = ({ amount }) => {
  const formattedAmount = numeral(amount).format("$0,0.00");
  return <div>{formattedAmount}</div>;
};

export default CurrencyFormat;
