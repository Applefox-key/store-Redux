import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import cl from "./ui.module.scss";

const BtnBack = () => {
  const router = useNavigate();
  return (
    <div className={"pointer " + cl.backBtn} onClick={() => router(-1)}>
      <MdOutlineArrowBackIosNew />
    </div>
  );
};

export default BtnBack;
