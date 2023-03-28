import React from "react";
import empty from "../../img/empty_box.png";
import orderOk from "../../img/orderOk.png";

const EmptyCart = ({ orderPlaced, showCartfn }) => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      <div className="text-center">
        {orderPlaced ? (
          <>
            <img
              src={orderOk}
              style={{ width: "83px", height: "120px" }}
              alt="order is ok"
            />
            <h3 className="mt-5 text-center greenText">
              The order has been placed!
            </h3>{" "}
            <h4>Your order will be delivered to courier delivery soon</h4>
          </>
        ) : (
          <>
            <img
              src={empty}
              style={{ width: "120px", height: "120px" }}
              alt="cart is empty"
            />
            <h6>You cart is empty. </h6>
            <h6>Add at least one product to place an order</h6>
          </>
        )}
        <button className="green_btn" onClick={() => showCartfn(false)}>
          ← go back
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
