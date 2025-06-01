import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
function ProductCard({ product, flex, renderDesc }) {
  const { title, image, price, rating, id, description } = product;
  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div className="">
        <h3>{title}</h3>
        {renderDesc && (
          <div style={{ maxWidth: "500px", textAlign: "justify" }}>
            {description}
          </div>
        )}
        <div className="">
          <div className={classes.rating}>
            <Rating value={rating?.rate} precision={0.1} size="small" />
            <small>{rating?.count}</small>
          </div>

          <div className="">
            <CurrencyFormat amount={price} />
          </div>
          <button className={classes.button}>
            <span>Add to Cart</span>
          </button>
        </div>

        <div className="product-extra-price"></div>
      </div>
    </div>
  );
}

export default ProductCard;
