import React, { useState, useContext, useEffect } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import axiosInstance from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/Firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError(null);
  };
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      const response = await axiosInstance.post(
        `https://us-central1-clone-a3c17.cloudfunctions.net/api/payments/create?total=${
          total * 100
        }`
      );

      const clientSecret = response.data.clientSecret;

      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (confirmation.error) {
        throw new Error(confirmation.error.message);
      }

      const paymentIntent = confirmation.paymentIntent;

      // ✅ Correct Modular Firestore Write
      await setDoc(
        doc(
          collection(doc(collection(db, "users"), user.uid), "orders"),
          paymentIntent.id
        ),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );
      // Clear the basket after successful payment
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      setCardError(error.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className={classes.payment_header}>
        Checkout <b>({totalItem})</b> items
      </div>
      <hr />
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>Street, City</div>
            <div>State, Country</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <p>Total Order Amount: </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" className={classes.payment_button}>
                    {processing ? (
                      <div className={classes.loading}>
                        {" "}
                        <ClipLoader color="gray" size={12} />
                        Please Wait...
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
