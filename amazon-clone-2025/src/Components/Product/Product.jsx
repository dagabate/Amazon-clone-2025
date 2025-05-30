import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);
  return (
    <section className={classes.products_container}>
      {products.map((singleproduct) => (
        <ProductCard product={singleproduct} key={singleproduct.id} />
      ))}
    </section>
  );
}

export default Product;
