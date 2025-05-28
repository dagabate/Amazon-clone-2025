import React from "react";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";

function Header() {
  return (
    <section>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <a href="">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </a>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={25} />
          </div>
          <div className={classes.order_container}>
            <a href="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt=""
              />

              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>
            {/* three components */}
            <a href="#">
              <div>
                <p>Sign In</p>
                <span>Account & Lists</span>
              </div>
            </a>

            {/* orders */}
            <a href="#">
              <p>returns</p>
              <span>& Orders</span>
            </a>

            {/* cart */}
            <a to={"/cart"} className={classes.cart}>
              <BiCart size={35}/>
              <span>0</span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Header;
