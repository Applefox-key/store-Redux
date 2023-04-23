import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { timestampToDate } from "../../utils/dates";
import cl from "./Orders.module.scss";
import OneOrderItem from "./OneOrderItem";
import BtnBack from "../UI/BtnToHome";
import BtnAgainToCart from "../UI/BtnAgainToCart";
const OneOrderPage = () => {
  const orderId = useParams().id;

  const oneOrder = useSelector((state) => state.user.orders)[orderId];
  console.log(oneOrder);

  return (
    <div className={cl.oneOrderPage}>
      <div className="d-flex align-items-center">
        <BtnBack />
        <h3>ORDER DETAILS</h3>
      </div>{" "}
      <div className={cl.status + " basic-wrap"}>{oneOrder.state}</div>
      <div className={cl.header}>
        <div className={cl.orderinfo + " basic-wrap"}>
          <div>
            {oneOrder.shipmentSettings.firstName}{" "}
            {oneOrder.shipmentSettings.lastName}
          </div>
          <div> {oneOrder.shipmentSettings.phone}</div>
          <div>
            {oneOrder.shipmentSettings.city},{oneOrder.shipmentSettings.state},
            USA
          </div>
        </div>
        <div className={cl.orderinfo + " basic-wrap"}>
          <div>Order id {oneOrder.id}</div>
          <div>{timestampToDate(oneOrder.dateTime)}</div>
          <div>Payment</div>
        </div>
      </div>
      <div className=" basic-wrap">
        {oneOrder.list.map((item) => (
          <OneOrderItem key={item.id} item={item}>
            {/* <button className="colorbtn">add to cart</button> */}
            <BtnAgainToCart item={item} />
          </OneOrderItem>
        ))}
        <div className="filler"> </div>

        <div className={cl.total}>
          <div>Total</div>
          <div>{oneOrder.totalPrice}$</div>
        </div>
      </div>
    </div>
  );
};

export default OneOrderPage;
