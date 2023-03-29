import React from "react";
import empty from "../../img/empty_box.png";
import orderOk from "../../img/orderOk.png";
import cl from "./Cart.module.scss";

const EmptyCart = ({ orderPlaced, closeCart }) => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      <div className="text-center h-50 mt-4">
        {orderPlaced ? (
          <>
            <img src={orderOk} className={cl.orderDone} alt="order is ok" />
            <h3 className="mt-5 text-center greenText">
              The order has been placed!
            </h3>{" "}
            <h4>Your order will be delivered to courier delivery soon</h4>
          </>
        ) : (
          <>
            <img src={empty} className={cl.emptyImg} alt="cart is empty" />
            <h6>You cart is empty. </h6>
            <h6>Add at least one product to place an order</h6>
          </>
        )}{" "}
      </div>
      <button className="green_btn" onClick={closeCart}>
        ← go back
      </button>
    </div>
  );
};

export default EmptyCart;
