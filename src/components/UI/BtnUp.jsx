import React, { useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { isBtnShow, scroll2Top } from "../../utils/scroll";
import cl from "./ui.module.scss";
const ButtonUp = () => {
  const [showBtn, setShowBtn] = useState(false);

  window.onscroll = function () {
    const res = isBtnShow();
    if (showBtn !== res) setShowBtn(res);
  };

  return (
    showBtn && (
      <BsFillArrowUpCircleFill onClick={scroll2Top} className={cl.btnUP} />
    )
  );
};

export default ButtonUp;
