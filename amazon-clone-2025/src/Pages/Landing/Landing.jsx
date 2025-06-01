import React from "react";
import Layout from "../../Components/Layout/Layout";
import CarouselComponent from "../../Components/Carousel/Carousel";
import Category from "../../Components/Category/Category";
import Product from "../../Components/Product/Product";


function Landing() {
  return (
    <Layout>
      
      <CarouselComponent />
      <Category />
      <Product />
    </Layout>
  );
}

export default Landing;
