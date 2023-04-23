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
import { TfiNotepad } from "react-icons/tfi";
import { useLocation, useNavigate } from "react-router-dom";
import { allRouts } from "../routes/routes";

import cartSlice from "../store/cart/cart-slice";

const Header = () => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const location = useLocation();
  const router = useNavigate();
  const isAuth = useSelector((store) => store.auth.isLoggedIn);
  const dispatch = useDispatch();
  const showCartfn = (show) => {
    if (show) {
      document.body.classList.add("body-no-scroll");
    } else document.body.classList.remove("body-no-scroll");
    dispatch(cartSlice.actions.openClose(show));
  };
  const toProfile = () => {
    if (isAuth) router(allRouts.PROFILE);
    else router(allRouts.LOGIN);
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
          className={location.pathname === "/home" ? "active" : "colorHover"}
          onClick={() => router(allRouts.HOME)}>
          <AiOutlineHome /> <span>home</span>
        </li>
        <li
          onClick={() => router(allRouts.ORDERS)}
          className={location.pathname === "/orders" ? "active" : "colorHover"}>
          <TfiNotepad />
          <span>orders</span>
        </li>
        <li
          onClick={toProfile}
          className={
            location.pathname === "/profile" ? "active" : "colorHover"
          }>
          <AiOutlineUser />
          <span>profile</span>
        </li>
        <li
          onClick={() => router(allRouts.FAVORITE)}
          className={
            location.pathname === "/favorite" ? "active" : "colorHover"
          }>
          <AiOutlineHeart />
          <span>favorite</span>
        </li>

        <li className="colorHover" onClick={() => showCartfn(true)}>
          {totalPrice ? <IoCart /> : <AiOutlineShoppingCart />}
          <span>{totalPrice}$</span>
        </li>
      </ul>
      {/* </div> */}
    </header>
  );
};

export default Header;
