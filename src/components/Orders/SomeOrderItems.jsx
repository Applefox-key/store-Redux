import React from "react";
import cl from "./Orders.module.scss";

const SomeOrderItems = ({ items, children }) => {
  return (
    <>
      <div className="">
        <div className={cl.oneItem}>
          <div className={cl.details}>
            {" "}
            {items.map((item, i) => (
              <img key={i} src={item.images[0]} alt="img" className={cl.img} />
            ))}
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default SomeOrderItems;
