import React from "react";
import empty from "../../img/empty_box.png";
import cl from "./Cart.module.scss";

const EmptyCart = ({ closeCart }) => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      <div className="text-center h-50 mt-4">
        <img src={empty} className={cl.emptyImg} alt="cart is empty" />
        <h6>You cart is empty. </h6>
        <h6>Add at least one product to place an order</h6>
      </div>
      <button className="colorbtnLg" onClick={closeCart}>
        ← go back
      </button>
    </div>
  );
};

export default EmptyCart;
