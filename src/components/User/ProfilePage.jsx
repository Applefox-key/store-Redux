import React, { useEffect, useState } from "react";
import UserData from "./UserData";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { TfiNotepad } from "react-icons/tfi";
import { allRouts } from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import cl from "./profile.module.scss";
import OrdersList from "../Orders/OrdersList";
import { MdLogout } from "react-icons/md";
import { closeSession } from "../../store/auth/auth-actions";

const ProfilePage = () => {
  const [content, setContent] = useState();
  const { firstName } = useSelector((state) => state.user.profile);
  const router = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const logout = () => {
    dispatch(closeSession());
    router(allRouts.HOME);
  };
  const textMenuArr = [
    {
      name: "Home",
      onClick: () => router("/home"),
    },
    {
      name: "Favorite",
      onClick: () => router("/favorite"),
    },
  ];
  const iconMenuArr = [
    { icon: <TfiNotepad />, name: "All orders", content: "orders" },
    {
      icon: <AiOutlineUser />,
      name: "Settings",
      content: "userdata",
    },
  ];
  useEffect(() => {
    if (isLoggedIn) return;
    router(allRouts.HOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  return (
    <div className={[cl["profilePage"], " w-100"].join(" ")}>
      <div className={cl["text-menu"]}>
        <h5 className="basic-wrap">User Profile</h5>
        <ul className={[cl["ul-text"], "basic-wrap"].join(" ")}>
          {textMenuArr.map((el, i) => (
            <li key={i} onClick={el.onClick}>
              <span>{el.name}</span>
            </li>
          ))}
          {iconMenuArr.map((el, i) => (
            <li
              key={i + "2"}
              className={content === el.content ? "active" : "colorHover"}
              onClick={() => setContent(el.content)}>
              <span>{el.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={cl["profile-content"]}>
        <h5 className="basic-wrap w-100">Hi, {firstName}!</h5>
        <ul className={cl["ul-icon"]}>
          {iconMenuArr.map((el) => (
            <li
              key={el.content}
              className={content === el.content ? "active" : "colorHover"}
              onClick={() => setContent(el.content)}>
              {el.icon}
              <span>{el.name}</span>
            </li>
          ))}
          <li onClick={logout} key="logout">
            {<MdLogout />} <span>logout</span>
          </li>
        </ul>
        <div className="mt-4">
          {content === "orders" ? <OrdersList /> : <UserData />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
