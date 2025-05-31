import React from "react";
import Layout from "../../Components/Layout/Layout";
import CarouselComponent from "../../Components/Carousel/Carousel";
import Category from "../../Components/Category/Category";
import Product from "../../Components/Product/Product";
import LowerHeader from "../../Components/Header/LowerHeader";

function Landing() {
  return (
    <Layout>
      <LowerHeader />
      <CarouselComponent />
      <Category />
      <Product />
    </Layout>
  );
}

export default Landing;
