import React, { useState, useEffect } from "react";
import classes from "./SignUp.module.css";
import Layout from "../../Components/Layout/Layout";
import { Link } from "react-router-dom";
import { auth } from "../../Utility/Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import Cliploader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const navigate = useNavigate();
  const authHandler = (e) => {
    e.preventDefault();

    if (e.target.name === "signIn") {
      // Sign in logic
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          dispatch({ type: "SET_USER", user: userCredential.user });
          setLoading({ ...loading, signIn: false });
          navigate("/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    } else if (e.target.name === "signUp") {
      // Sign up logic
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch({ type: "SET_USER", user: userCredential.user });
          setLoading({ ...loading, signUp: false });
          navigate("/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <Layout>
      <section className={classes.login}>
        {/* logo*/}
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            className={classes.logo}
          />
        </Link>
        {/*form */}

        <div className={classes.loginContainer}>
          <h1>Sign-In</h1>
          <form action="">
            <div className={classes.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                id="password"
                required
              />
            </div>
            <button
              type="submit"
              onClick={authHandler}
              name="signIn"
              className={classes.login_signIn}
            >
              {loading.signIn ? (
                <Cliploader color="#fff" size={20}></Cliploader>
              ) : (
                "Sign In"
              )}
            </button>
            <p>
              By continuing, you agree to Amazon's Conditions of Use and Privacy
              Notice.{" "}
            </p>
            New to Amazon?
            <button
              onClick={authHandler}
              type="submit"
              name="signUp"
              className={classes.login_register}
            >
              {loading.signUp ? (
                <Cliploader color="#fff" size={20}></Cliploader>
              ) : (
                "Create your Amazon account"
              )}
            </button>
            {error && (
              <small
                style={{ color: "red", paddingTop: "5px", textAlign: "center" }}
              >
                {error}
              </small>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default Auth;
