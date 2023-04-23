import { TextField } from "@mui/material";
import React, { useState } from "react";
import { userDataStruct } from "../../utils/userDataStruct";
import { formatingUserData, isUserDataValid } from "../../utils/validation";
import cl from "./profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../../store/user/user-slice";

const EditProfileForm = ({
  userData,
  setUserData,
  finalCallBack,
  isBackBtn,
}) => {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.id;
    const formatedData = formatingUserData(field, value);
    setUserData({ ...userData, [field]: formatedData });
  };

  const handleBlur = (event) => {
    const value = event.target.value;
    const field = event.target.id;
    const isValid = isUserDataValid(field, value);
    if (isValid && errors.includes(field)) {
      setErrors(errors.filter((el) => el !== field));
    } else if (!isValid && !errors.includes(field)) {
      let newErr = [...errors];
      newErr.push(field);
      setErrors(newErr);
    }
  };

  const isError = (field) => {
    if (!errors.length) return false;
    return errors.includes(field);
  };

  const inputParams = (field) => {
    const item = userDataStruct[field];
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
      params.onBlur = handleBlur;
      params.helperText = isError(field) && "Incorrect entry.";
      params.onBlur = handleBlur;
      params.error = isError(field);
    }
    return params;
  };

  const saveChanges = () => {
    dispatch(userSlice.actions.changeData(userData));
    finalCallBack();
  };

  return (
    <div className={cl["user-data-form"]}>
      {isAuth && (
        <div className="basic-flex">
          <h5 className="fs-1">SHIPPING ADRESS</h5>
        </div>
      )}
      <div className={cl.dataString}>
        <TextField {...inputParams("firstName")} />{" "}
        <TextField {...inputParams("lastName")} />{" "}
      </div>
      <div className={cl.dataString}>
        <TextField {...inputParams("email")} />{" "}
        <TextField {...inputParams("phone")} />
      </div>
      <div className={cl.dataString}>
        <TextField {...inputParams("streetAddress")} />{" "}
        <TextField {...inputParams("addressInfo")} />
      </div>
      <div className={cl.dataString}>
        <TextField {...inputParams("city")} />{" "}
        <TextField {...inputParams("zipCode")} />{" "}
        <TextField {...inputParams("state")} />{" "}
      </div>{" "}
      <div className={isBackBtn ? cl.btnBox : cl.btnBox + " mt-1"}>
        <button
          onClick={saveChanges}
          disabled={errors.length}
          className={isBackBtn ? "colorbtn" : "colorbtn w-100 m-auto"}>
          Save profile changes
        </button>
        {isBackBtn && (
          <button onClick={finalCallBack} className="colorbtn">
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default EditProfileForm;
