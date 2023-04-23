import { createSlice } from "@reduxjs/toolkit";
import { userInitialState } from "../../utils/userDataStruct";

const userSlice = createSlice({
  name: "user",
  initialState: { ...userInitialState },
  reducers: {
    replaceData(state, action) {
      state.orders = action.payload.orders ? action.payload.orders : {};
      state.favorite = action.payload.favorite ? action.payload.favorite : [];
      state.profile = action.payload.profile ? action.payload.profile : {};
    },
    changedOff(state, action) {
      state.changed = false;
    },
    switchFav(state, action) {
      state.changed = true;
      const item = action.payload;
      const existingItemIndex = state.favorite.findIndex(
        (el) => el.id === item.id
      );

      if (existingItemIndex !== -1) {
        state.favorite = state.favorite.filter((el) => el.id !== item.id);
      } else {
        state.favorite.push(item);
      }
    },
    placeOrder(state, action) {
      const order = action.payload;
      const orderId = action.payload.id;

      state.orders[orderId] = order;
    },
    changeData(state, action) {
      state.profile = { ...state.profile, ...action.payload };
      state.changed = true;
    },
    resetData(state, action) {
      return { ...userInitialState };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
