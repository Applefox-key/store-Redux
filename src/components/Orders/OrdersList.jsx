import React from "react";
import { timestampToDate } from "../../utils/dates";
import cl from "./Profile.module.scss";
import OrdersItem from "./OrdersItem";

const OrdersList = ({ purchase }) => {
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-start align-items-top">
        {purchase.map((item, i) => (
          <div className={cl.oneOrder} key={item.id}>
            <h5>ORDER </h5>
            <div className="d-flex justify-content-between w-100">
              <h6> {timestampToDate(item.dateTime)}</h6>{" "}
              <h6 className="ml-1 fontW_700">{item.totalPrice}$</h6>
            </div>{" "}
            <div className="d-flex justify-content-between w-100 greenText">
              <h6> state</h6> <h6 className="ml-1 fontW_700">{item.state}</h6>
            </div>{" "}
            <div className="filler"> </div>
            <br />
            <OrdersItem list={item.list} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
