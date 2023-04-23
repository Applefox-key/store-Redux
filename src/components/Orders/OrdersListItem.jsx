import React from "react";

import cl from "./Orders.module.scss";
const OrdersListItem = ({ list }) => {
  return (
    <div className={cl.itemsWrap}>
      <div className={cl.items}>
        {list.map((el) => (
          <div
            key={el.id}
            className="d-flex align-items-center  justify-content-start w-100">
            <img src={el.images[0]} alt="img" className={cl.img} />
            <div className="ml-1">
              {el.title}
              <div
                className="d-flex justify-content-between flex-wrap"
                style={{ width: "10rem" }}>
                <div style={{ fontWeight: "700" }}>
                  {el.price}$ x{el.quantity}
                </div>
                <div style={{ fontWeight: "700" }}>{el.total}$</div>
              </div>
            </div>
          </div>
        ))}{" "}
      </div>{" "}
      <div className={cl.orderStatus}>processing</div>
    </div>
  );
};

export default OrdersListItem;
