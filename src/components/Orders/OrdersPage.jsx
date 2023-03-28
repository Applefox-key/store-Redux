import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import sad from "../../img/sad.png";
import OrdersList from "./OrdersList";
import { allRouts } from "../../routes/routes";

const OrdersPage = () => {
  const { purchase } = useSelector((state) => state.user);
  const router = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-center">
      {purchase.length ? (
        <OrdersList purchase={purchase} />
      ) : (
        <div className="h-100 text-center">
          <img src={sad} alt="cart is empty" />
          <h6>You have no orders. </h6>
          <h6>Place at least one order</h6>
          <button className="green_btn" onClick={() => router(allRouts.HOME)}>
            ← go back
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
