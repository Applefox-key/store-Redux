import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import sad from "../../img/sad.png";
import OrdersCardsList from "./OrdersCardsList";
import { allRouts } from "../../routes/routes";
import BtnToHome from "../UI/BtnToHome";

const OrdersPage = () => {
  const router = useNavigate();
  const purchase = useSelector((state) => state.user.orders);
  console.log(purchase);

  const orders = Object.values(purchase);
  return (
    <div>
      <div className="d-flex align-items-center">
        <BtnToHome />
        <h3>My Orders</h3>
      </div>
      {orders.length ? (
        <OrdersCardsList purchase={orders} />
      ) : (
        <div className="h-100 text-center">
          <img src={sad} alt="cart is empty" />
          <h6>You have no orders. </h6>
          <h6>Place at least one order</h6>
          <button className="colorbtnLg" onClick={() => router(allRouts.HOME)}>
            ← go back
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
