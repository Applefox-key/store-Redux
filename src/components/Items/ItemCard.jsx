import React from "react";

import cl from "./Items.module.scss";
import { useNavigate } from "react-router-dom";

import FavoriteBtn from "../Favorite/FavoriteBtn";
import BtnAddToCart from "../UI/BtnAddToCart";

const ItemCard = ({ item }) => {
  const router = useNavigate();
  return (
    <div className={cl.card}>
      <FavoriteBtn item={item} />
      <img
        className="pointer mt-1"
        src={item.images[0]}
        onClick={(e) => router("/item/" + item.id)}
        alt="phone"
      />
      <div className={cl.imgCloneDiv} id={"imgDiv" + item.id}>
        <img
          className={cl.imgClone}
          src={item.images[0]}
          alt="phone"
          id={"img" + item.id}
        />
      </div>
      <div className="text-center">{item.title}</div>
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex flex-column">
          <span>Price: </span>
          <b>{item.price}$</b>
        </div>

        <BtnAddToCart item={item} />
      </div>
    </div>
  );
};

export default ItemCard;
