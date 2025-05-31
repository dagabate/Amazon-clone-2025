import React from "react";
import classes from "./ProductDetail.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { producturl } from "../../Api/EndPoints";
import ProductCard from "../../Components/Product/ProductCard";
function ProductDetail() {
  const { productId } = useParams();
  const [products, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get(`${producturl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);
  return (
    <Layout>
      <ProductCard product={products} />
    </Layout>
  );
}

export default ProductDetail;
