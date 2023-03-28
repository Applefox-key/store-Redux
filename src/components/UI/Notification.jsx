import { Alert } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import uiSlice from "../../store/ui/ui-slice";

const Notification = ({ type, message }) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const handleClose = () => {
    dispatch(uiSlice.actions.showNotification({ open: false }));
  };
  return (
    <div>
      {notification.open && (
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default Notification;
