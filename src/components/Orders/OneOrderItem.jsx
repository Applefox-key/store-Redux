import React from "react";
import cl from "./Orders.module.scss";

const OneOrderItem = ({ item, children }) => {
  return (
    <div className={cl.oneItem}>
      <div className={cl.details}>
        <img src={item.images[0]} alt="img" className={cl.img} />
        <div className={cl.itemData}>
          <div>
            <div>{item.description}</div>
            <div>{item.title}</div>
            <b>{item.price}$</b> x <b>{item.quantity}</b>
          </div>
        </div>{" "}
      </div>
      {children}
    </div>
  );
};
export default OneOrderItem;
