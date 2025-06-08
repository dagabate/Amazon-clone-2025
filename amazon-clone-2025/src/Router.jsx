import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import Payment from "./Pages/Payment/Payment";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectRoute from "./Components/ProtectRoute";
const stripePromise = loadStripe(
  "pk_test_51RWlOQBXe2G24bej1QCOT0DbixyvqWY2Imls72L8mtWWi9zvfMYqVUxh3yt9OsTWaJvfRphHj2pmatym5xRG0RPI00QmoyXh21"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectRoute
              msg="You need to login to proceed to payment"
              redirect="/payments"
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectRoute
              msg="You need to login to access your orders"
              redirect="/orders"
            >
              <Orders />{" "}
            </ProtectRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default Routing;
