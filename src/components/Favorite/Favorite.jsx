import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { sendUserData } from "../../store/user/user-actions";
import ItemCard from "../Items/ItemCard";

import BtnToHome from "../UI/BtnToHome";
const Favorite = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.changed) dispatch(sendUserData(user));
  }, [user, dispatch]);

  return (
    <>
      <div className="d-flex align-items-center">
        <BtnToHome />
        <h3>My Favorites</h3>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {user.favorite &&
          user.favorite.map((item, i) => <ItemCard item={item} key={i} />)}
      </div>
    </>
  );
};

export default Favorite;
