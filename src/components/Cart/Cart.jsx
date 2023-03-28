import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../store/cart/cart-slice";
import CartItem from "../CartItem/CartItem";
import cl from "./Cart.module.scss";
import userSlice from "../../store/user/user-slice";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const placeAnOrder = () => {
    dispatch(userSlice.actions.placeOrder(cart));
    dispatch(cartSlice.actions.placeOrder());
  };

  const dispatch = useDispatch();
  const showCartfn = (show) => {
    if (show) document.body.classList.add("body-no-scroll");
    else document.body.classList.remove("body-no-scroll");
    dispatch(cartSlice.actions.openClose(show));
  };
  const removeItem = (item) => {
    dispatch(cartSlice.actions.removeFromCart(item));
  };

  return (
    cart.showCart && (
      <div
        className={cl.overlay}
        onClick={(e) => {
          if (e.target === e.currentTarget) showCartfn(false);
        }}>
        <div className={cl.sidebar}>
          <div className="d-flex justify-content-between">
            <h2>Cart</h2>
            <button className="btnOne" onClick={() => showCartfn(false)}>
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
                <button className={cl.btnBuy} onClick={placeAnOrder}>
                  Pay
                </button>
              </div>
            </>
          ) : (
            <EmptyCart orderPlaced={cart.orderPlaced} showCartfn={showCartfn} />
          )}
        </div>
      </div>
    )
  );
};

export default Cart;
