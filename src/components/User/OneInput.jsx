import { TextField } from "@mui/material";
import React, { useState } from "react";
import { formatingUserData, isUserDataValid } from "../../utils/validation";

const OneInput = ({ onChange, setIsError, ...props }) => {
  const [error, setError] = useState(false);
  const handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.id;
    const formatedData = formatingUserData(field, value);
    onChange(field, formatedData);
    //validation
  };
  const handleBlur = (event) => {
    const value = event.target.value;
    const field = event.target.id;
    const isValid = isUserDataValid(field, value);
    setError(!isValid(field, value));
    setIsError(field, value);
  };

  return (
    <TextField
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={error && "Incorrect entry."}
    />
  );
};

export default OneInput;
