import React from "react";
import cl from "./InputBox.module.scss";
import { TextField } from "@mui/material";
const InputBox = ({ type, value, lable, placeholder, fn, id, props }) => {
  return (
    <div>
      <TextField
        onChange={fn}
        id={id}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        value={value}
        label={lable}
        type={type ? type : "text"}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default InputBox;
