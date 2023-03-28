import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { allRouts } from "../../routes/routes";
import cl from "./ui.module.scss";

const BtnToHome = () => {
  const router = useNavigate();
  return (
    <div
      className={"pointer " + cl.backBtn}
      onClick={() => router(allRouts.HOME)}>
      <MdOutlineArrowBackIosNew />
    </div>
  );
};

export default BtnToHome;
