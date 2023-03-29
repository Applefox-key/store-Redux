import React from "react";
import { useDispatch, useSelector } from "react-redux";
import im from "../img/favicon.ico";
import { IoCart } from "react-icons/io5";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineHome,
} from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { allRouts } from "../routes/routes";

import cartSlice from "../store/cart/cart-slice";

const Header = () => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const location = useLocation();
  const router = useNavigate();

  const dispatch = useDispatch();
  const showCartfn = (show) => {
    if (show) {
      document.body.classList.add("body-no-scroll");
    } else document.body.classList.remove("body-no-scroll");
    dispatch(cartSlice.actions.openClose(show));
  };

  return (
    <header>
      <div
        className="d-flex align-items-center pointer"
        onClick={() => router(allRouts.HOME)}>
        <img src={im} alt="logo" className="logo" />
        <div className="d-flex flex-column justify-content-between">
          <h4 className="m-0">STORE</h4>
          <p className="m-0"> Online store</p>
        </div>
      </div>

      <ul>
        <li
          className={location.pathname === "/home" ? "active" : "hoverGreen"}
          onClick={() => router(allRouts.HOME)}>
          <AiOutlineHome /> <span>home</span>
        </li>
        <li
          onClick={() => router(allRouts.PROFILE)}
          className={
            location.pathname === "/profile" ? "active" : "hoverGreen"
          }>
          <AiOutlineUser />
          <span>orders</span>
        </li>
        <li
          onClick={() => router(allRouts.FAVORITE)}
          className={
            location.pathname === "/favorite" ? "active" : "hoverGreen"
          }>
          <AiOutlineHeart />
          <span>favorite</span>
        </li>

        <li className="hoverGreen" onClick={() => showCartfn(true)}>
          {totalPrice ? <IoCart /> : <AiOutlineShoppingCart />}
          <span>{totalPrice}$</span>
        </li>
      </ul>
      {/* </div> */}
    </header>
  );
};

export default Header;
