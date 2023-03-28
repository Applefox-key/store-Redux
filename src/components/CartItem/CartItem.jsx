import React from "react";
import { useDispatch } from "react-redux";
import cartSlice from "../../store/cart/cart-slice";
import cl from "./CartItem.module.scss";

const CartItem = ({ item, removeItem }) => {
  const dispatch = useDispatch();
  const changeQuantity = (value) => {
    dispatch(cartSlice.actions.changeQuantity({ value: value, item: item }));
  };
  return (
    <div className={cl.cartItem}>
      <img src={item.images[0]} alt="img" className={cl.img} />
      <div className={cl.title_price}>
        <div>{item.title}</div>

        <b>{item.price}$</b>
      </div>{" "}
      <div className="ms-2 text-center w-30px">
        <button className="btnOne" onClick={() => changeQuantity(1)}>
          ✚
        </button>
        <div>{item.quantity}</div>
        <button className="btnOne" onClick={() => changeQuantity(-1)}>
          ⚊
        </button>
      </div>
      <div className="30px">{item.total}$</div>
      <button className="btnOne" onClick={() => removeItem(item)}>
        ✕
      </button>
    </div>
  );
};

export default CartItem;
