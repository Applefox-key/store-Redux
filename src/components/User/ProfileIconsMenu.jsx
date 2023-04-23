import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { TfiNotepad } from "react-icons/tfi";
import { useLocation, useNavigate } from "react-router-dom";

import { allRouts } from "../../routes/routes";
const ProfileIconsMenu = () => {
  const location = useLocation();
  const router = useNavigate();

  return (
    <>
      <ul className="d-flex w-100 ul-icon mb-4">
        <li
          onClick={() => router(allRouts.ORDERS)}
          className={location.pathname === "/orders" ? "active" : "colorHover"}>
          <TfiNotepad />
          <span>my orders</span>
        </li>
        <li
          onClick={() => router(allRouts.PROFILE)}
          className={
            location.pathname === "/profile" ? "active" : "colorHover"
          }>
          <AiOutlineUser />
          <span>Personal information</span>
        </li>
      </ul>
    </>
  );
};

export default ProfileIconsMenu;
