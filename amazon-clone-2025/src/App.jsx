import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import LowerHeader from "./Components/Header/LowerHeader";
import CarouselComponent from "./Components/Carousel/Carousel";

function App() {
  return (
    <>
      <Header />
      <LowerHeader />
      <CarouselComponent />
    </>
  );
}

export default App;
