import React from "react";

import cl from "./Orders.module.scss";

const OrdersCardItem = ({ list }) => {
  return (
    <div className={cl.orderItems}>
      {list.map((el) => (
        <div
          key={el.id}
          className="d-flex mb-1 align-items-center  justify-content-start w-100">
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
      ))}
    </div>
  );
};

export default OrdersCardItem;
