import React from "react";
import cartSlice from "../../store/cart/cart-slice";
import { useDispatch } from "react-redux";
import { useGetItemQuery } from "../../features/apiSlice";

const BtnAgainToCart = ({ item }) => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetItemQuery(item.id);
  const addToCart = () => {
    dispatch(cartSlice.actions.addToCart(data));
  };

  return (
    <>
      {isSuccess && (
        <button className="colorbtn" onClick={addToCart}>
          add to cart
        </button>
      )}
    </>
  );
};

export default BtnAgainToCart;
