import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { allRouts } from "../../routes/routes";

const ProfileMenu = () => {
  const location = useLocation();
  const router = useNavigate();
  return (
    <>
      <ul className="ul-text">
        <li
          className={location.pathname === "/home" ? "active" : "colorHover"}
          onClick={() => router(allRouts.HOME)}>
          <span>home</span>
        </li>
        <li
          onClick={() => router(allRouts.ORDERS)}
          className={location.pathname === "/orders" ? "active" : "colorHover"}>
          <span>my orders</span>
        </li>
        <li
          onClick={() => router(allRouts.PROFILE)}
          className={
            location.pathname === "/profile" ? "active" : "colorHover"
          }>
          <span>Personal information</span>
        </li>
        <li
          onClick={() => router(allRouts.FAVORITE)}
          className={
            location.pathname === "/favorite" ? "active" : "colorHover"
          }>
          <span>favorite</span>
        </li>
      </ul>
      {/* </div> */}
    </>
  );
};

export default ProfileMenu;
