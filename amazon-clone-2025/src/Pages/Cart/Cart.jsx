import React from "react";
import classes from "./Cart.module.css";
import Layout from "../../Components/Layout/Layout";
import { useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { ...item, amount: 1 },
    });
  };
  const decrement = (item) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      item: { ...item, amount: 1 },
    });
  };

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />

          {basket?.length == 0 ? (
            <p>Oops: No item in your cart</p>
          ) : (
            basket?.map((item) => {
              return (
                <section key={item.id} className={classes.cart_product}>
                  <ProductCard
                    product={item}
                    flex={true}
                    renderDesc={true}
                    renderAdd={false}
                  />
                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={30} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item)}
                    >
                      <IoIosArrowDown size={30} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}

        <div></div>
      </section>
    </Layout>
  );
}

export default Cart;
