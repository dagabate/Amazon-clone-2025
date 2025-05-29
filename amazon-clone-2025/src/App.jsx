import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import LowerHeader from "./Components/Header/LowerHeader";
import CarouselComponent from "./Components/Carousel/Carousel";
import Category from "./Components/Category/Category";

function App() {
  return (
    <>
      <Header />
      <LowerHeader />
      <CarouselComponent />
      <Category />
    </>
  );
}

export default App;
