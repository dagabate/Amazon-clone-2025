import React, { useState, useEffect } from "react";
import classes from "./Results.module.css";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { producturl } from "../../Api/EndPoints";
import ProductCard from "../../Components/Product/ProductCard";
function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  useEffect(() => {
    axios
      .get(`${producturl}/products/category/${categoryName}`)
      .then((res) => {
        
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryName]);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        <div className={classes.products_container}>
          {results?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Results;
