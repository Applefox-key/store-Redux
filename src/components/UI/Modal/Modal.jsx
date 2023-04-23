import React from "react";
import cl from "./Modal.module.scss";

const Modal = ({ children, closeModal }) => {
  return (
    <div className={cl.overlay}>
      <div className={"basic-wrap " + cl["content-wrap"]}>
        {" "}
        <button className={cl.button} onClick={closeModal}>
          ❌
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
