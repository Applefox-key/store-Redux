import React from "react";
import { timestampToDate } from "../../utils/dates";
import cl from "./Orders.module.scss";
import { useSelector } from "react-redux";
import OrdersListItem from "./OrdersListItem";
import { Link, useNavigate } from "react-router-dom";
import { allRouts } from "../../routes/routes";
import OneOrderItem from "./OneOrderItem";
import SomeOrderItems from "./SomeOrderItems";

const OrdersList = () => {
  const purchase = useSelector((state) => state.user.orders);
  console.log(purchase);

  const orders = Object.values(purchase);
  console.log(orders);
  const router = useNavigate();
  const handleClick = (id) => {
    router(allRouts.ORDERS + "/" + id);
  };

  return (
    <div className={cl.oneOrderPage}>
      <div className=" ">
        {orders.map((el, i) => (
          <div className="basic-wrap pl-4 pr-4">
            <div className={cl.header}>
              <div>
                <b>{el.state}</b>
              </div>
              <div>
                <div>Order id {el.id}</div>
                <div>{timestampToDate(el.dateTime)}</div>
              </div>
              <Link to={allRouts.ORDERS + "/" + el.id}>ORDER DETAILS</Link>
            </div>
            <div className="filler"> </div>
            {el.list.length === 1 ? (
              <OneOrderItem item={el.list[0]} />
            ) : (
              <SomeOrderItems items={el.list}></SomeOrderItems>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
