import React from "react";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../../store/user/user-slice";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import cl from "./Favorite.module.scss";

const FavoriteBtn = ({ item, ...props }) => {
  const dispatch = useDispatch();
  const addToFav = (item) => {
    dispatch(userSlice.actions.switchFav(item));
  };
  const favoriteid = useSelector((state) => state.user.favoriteid);

  return (
    <>
      <button className={cl.btnHeart} {...props} onClick={() => addToFav(item)}>
        {favoriteid.includes(item.id) ? <BsHeartFill /> : <BsHeart />}
      </button>
    </>
  );
};

export default FavoriteBtn;
