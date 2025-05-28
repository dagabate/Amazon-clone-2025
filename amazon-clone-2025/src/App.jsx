import React, { useState } from "react";
import { img } from "./assets/Images/data";
import "./App.css";
import Header from "./Components/Header/Header";
import LowerHeader from "./Components/Header/LowerHeader";

function App() {
  return (
    <>
      <Header />
      <LowerHeader />
    </>
  );
}

export default App;
