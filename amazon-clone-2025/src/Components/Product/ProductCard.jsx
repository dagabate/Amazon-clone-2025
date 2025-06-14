import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { title, image, price, rating, id, description } = product;
  const [state, dispatch] = useContext(DataContext);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        title,
        image,
        price,
        rating,
        description,
      },
    });
  };
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
          {renderAdd && (
            <button className={classes.button} onClick={addToCart}>
              <span>Add to Cart</span>
            </button>
          )}
        </div>

        <div className="product-extra-price"></div>
      </div>
    </div>
  );
}

export default ProductCard;
