import React, { use, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import Layout from "../../Components/Layout/Layout";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../Utility/Firebase";
import { useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
function Orders() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      const userOrdersRef = collection(
        doc(collection(db, "users"), user.uid),
        "orders"
      );

      const q = query(userOrdersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, []);
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders.length === 0 && (
            <p style={{ padding: "20px" }}>You don't have orders yet</p>
          )}
          <div>
            {orders?.map((order) => {
              return (
                <div key={order.id} className={classes.order}>
                  <hr />
                  <p>Order ID: {order.id}</p>
                  <div className={classes.order_items}>
                    {order.data.basket?.map((item) => {
                      return (
                        <ProductCard key={item.id} product={item} flex={true} />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
