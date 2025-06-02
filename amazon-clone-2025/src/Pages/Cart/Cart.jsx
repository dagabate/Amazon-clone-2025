import React from "react";
import classes from "./Cart.module.css";
import Layout from "../../Components/Layout/Layout";
import { useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

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
                <ProductCard
                  product={item}
                  flex={true}
                  renderDesc={true}
                  renderAdd={false}
                />
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
            <Link to="payments">Continue to checkout</Link>
          </div>
        )}

        <div></div>
      </section>
    </Layout>
  );
}

export default Cart;
