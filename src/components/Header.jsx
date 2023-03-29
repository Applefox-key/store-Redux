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
    <header className="d-flex justify-content-between align-items-center mb-4">
      <div
        className="d-flex align-items-center pointer"
        onClick={() => router(allRouts.HOME)}>
        <img src={im} alt="logo" className="logo" />
        <div className="d-flex flex-column justify-content-between">
          <h4 className="m-0">STORE</h4>
          <p className="m-0"> Online store</p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <ul className="text-decoration-none d-flex">
          <li className=" fs-2  me-4 pointer">
            <AiOutlineUser
              className="hoverGreen"
              onClick={() => router(allRouts.PROFILE)}
            />
          </li>
          <li className=" fs-2 me-2 pointer me-4">
            {location.pathname === "/home" ? (
              <AiOutlineHeart
                onClick={() => router(allRouts.FAVORITE)}
                className="hoverRose"
              />
            ) : (
              <AiOutlineHome
                className="hoverGreen"
                onClick={() => router(allRouts.HOME)}
              />
            )}
          </li>
          <li
            className=" fs-2 pointer me-4 hoverGreen"
            onClick={() => showCartfn(true)}>
            {totalPrice ? <IoCart /> : <AiOutlineShoppingCart />}
            <span className="ms-1 fs-4">{totalPrice}$</span>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
