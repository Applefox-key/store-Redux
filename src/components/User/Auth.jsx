import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cl from "./Auth.module.scss";
import { TextField } from "@mui/material";
import { authStruct } from "../../utils/userDataStruct";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  formatingUserData,
  isAllValuesFilled,
  isUserDataValid,
} from "../../utils/validation";
import uiSlice from "../../store/ui/ui-slice";
import { allRouts } from "../../routes/routes";
import { authorization } from "../../store/auth/auth-actions";
import { testData } from "../../utils/constants";

const Auth = () => {
  const [isNew, setIsNew] = useState(true);
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useNavigate();
  const path = useLocation();
  //login or create new user
  const handleSubmit = (e) => {
    e.preventDefault();
    const [isValid, errorMsg] = isAllValuesFilled(userData, authStruct);
    if (!isValid) {
      dispatch(
        uiSlice.actions.showNotification({
          open: true,
          message: errorMsg,
          type: "error",
        })
      );
      return;
    }
    dispatch(authorization(userData, isNew));
  };
  //check is inputValue in errors list
  const isError = (field) => {
    if (!errors.length) return false;
    return errors.includes(field);
  };
  //check input for an errors
  const handleBlur = (event) => {
    const value = event.target.value;
    const field = event.target.id;
    const isValid = isUserDataValid(
      field,
      value,
      field.includes("password") ? userData : ""
    );
    if (isValid && errors.includes(field)) {
      setErrors(errors.filter((el) => el !== field));
    } else if (!isValid && !errors.includes(field)) {
      let newErr = [...errors];
      newErr.push(field);
      setErrors(newErr);
    }
  };
  //change input value
  const handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.id;
    const formatedData = formatingUserData(field, value);
    setUserData({ ...userData, [field]: formatedData });
  };

  //determine an input parameters set
  const inputParams = (field) => {
    const item = authStruct[field];
    let params = {
      InputLabelProps: {
        shrink: true,
      },
      variant: "standard",
      onChange: handleChange,
      className: cl["oneInput"],
      value: userData[field],
      label: item.label,
      required: !item.optional,
      id: field,
      type: item.type ? item.type : "text",
      placeholder: item.placeholder ? item.placeholder : item.label,
    };
    if (item.pattern) params.pattern = item.pattern;
    if (item.formatCheck) {
      params.helperText = isError(field) && "Incorrect entry.";
      params.onBlur = handleBlur;
      params.error = isError(field);
    }
    return params;
  };
  useEffect(() => {
    if (!isLoggedIn) return;

    if (path.pathname.includes("login")) router(allRouts.PROFILE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <div className={"basic-wrap " + cl["user-login-form"]}>
      <h2 className={"title"}>{isNew ? "Register" : "Login"}</h2>
      {isNew && (
        <div className={cl.dataStringTwo}>
          <TextField {...inputParams("firstName")} />{" "}
          <TextField {...inputParams("lastName")} />{" "}
        </div>
      )}
      <div className={cl.dataString}>
        <TextField {...inputParams("email")} />{" "}
        {/* <TextField {...inputParams("phone")} /> */}
      </div>
      <div className={cl.dataString}>
        <TextField {...inputParams("password")} />{" "}
      </div>
      {isNew && (
        <div className={cl.dataString}>
          <TextField {...inputParams("passwordConfirm")} />
        </div>
      )}
      <button
        className="colorbtnLg"
        onClick={handleSubmit}
        disabled={errors.length}>
        {isNew ? "SUBMIT" : "LOGIN"}
      </button>
      <div className={cl.dataString}>
        {isNew ? "Already have an acount ?" : "Already have NO an acount ?"}
        <Link
          href="#"
          onClick={() => {
            if (isNew) setUserData({ ...testData });
            setIsNew(!isNew);
          }}>
          {isNew ? "Signin" : "Register"}
        </Link>
      </div>
    </div>
  );
};

export default Auth;
