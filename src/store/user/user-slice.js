import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { favorite: [], favoriteid: [], purchase: [], changed: false },
  reducers: {
    replaceData(state, action) {
      state.purchase = action.payload.purchase ? action.payload.purchase : [];
      state.favorite = action.payload.favorite ? action.payload.favorite : [];
      state.favoriteid = action.payload.favoriteid
        ? action.payload.favoriteid
        : [];
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
        state.favoriteid = state.favoriteid.filter((el) => el !== item.id);
        state.favorite = state.favorite.filter((el) => el.id !== item.id);
      } else {
        state.favoriteid.push(item.id);
        state.favorite.push(item);
      }
    },
    placeOrder(state, action) {
      state.changed = true;
      const items = action.payload.itemsList;
      const totalPrice = action.payload.totalPrice;
      const orderId = crypto.randomUUID();
      state.purchase.push({
        "id": orderId,
        "list": items,
        "totalPrice": totalPrice,
        "state": "processing",
        "dateTime": Date.now(),
      });
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
