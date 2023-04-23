import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../store/cart/cart-slice";
import CartItem from "../CartItem/CartItem";
import cl from "./Cart.module.scss";
import EmptyCart from "./EmptyCart";
import { useNavigate } from "react-router-dom";
import { allRouts } from "../../routes/routes";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const router = useNavigate();

  const dispatch = useDispatch();
  const closeCart = () => {
    document.body.classList.remove("body-no-scroll");
    dispatch(cartSlice.actions.openClose(false));
  };
  const removeItem = (item) => {
    dispatch(cartSlice.actions.removeFromCart(item));
  };
  const placeAnOrder = () => {
    closeCart();
    router(allRouts.NEW_ORDER);
  };
  return (
    cart.showCart && (
      <div
        className={cl.overlay}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeCart();
        }}>
        <div className={cl.sidebar}>
          <div className="d-flex justify-content-between">
            <h2>Cart</h2>
            <button className="btnOne" onClick={() => closeCart()}>
              ✕
            </button>
          </div>

          {!!cart.itemsList.length ? (
            <>
              <div style={{ overflow: "auto", height: "65vh" }}>
                {cart.itemsList &&
                  cart.itemsList.map((item, i) => (
                    <CartItem item={item} key={i} removeItem={removeItem} />
                  ))}
              </div>

              <div className="mt-5">
                <div className="d-flex" style={{ fontSize: "30px" }}>
                  <b>Total</b>
                  <div className="filler"> </div>
                  <b>{cart.totalPrice}$</b>
                </div>
                <button className="colorbtnLg" onClick={placeAnOrder}>
                  Make an order
                </button>
              </div>
            </>
          ) : (
            <EmptyCart orderPlaced={cart.orderPlaced} closeCart={closeCart} />
          )}
        </div>
      </div>
    )
  );
};

export default Cart;
