import React from "react";
import cartSlice from "../../store/cart/cart-slice";
import { BsCartPlus } from "react-icons/bs";
import { toCartAnimation } from "../../utils/cart_animation";
import { getQuantity } from "../../utils/getQuantity";
import cl from "./ui.module.scss";
import { useDispatch, useSelector } from "react-redux";

const BtnAddToCart = ({ item }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    toCartAnimation(item);
    setTimeout(() => {
      dispatch(cartSlice.actions.addToCart(item));
    }, 1000);
  };
  const itemsCart = useSelector((state) => state.cart.itemsList);
  const quantity = getQuantity(itemsCart, item);

  return (
    <>
      {" "}
      <div className="d-flex">
        {quantity && <span className={cl.quantity}>{quantity}</span>}
        <BsCartPlus
          className="colorHover"
          style={{ fontSize: "2rem" }}
          onClick={addToCart}>
          add to cart
        </BsCartPlus>
      </div>
    </>
  );
};

export default BtnAddToCart;
