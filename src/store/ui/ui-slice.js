import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: null },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type ? action.payload.type : "success",
        open: action.payload.open === undefined ? true : action.payload.open,
      };
    },
  },
});

export default uiSlice;
