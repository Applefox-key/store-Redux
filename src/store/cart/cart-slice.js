import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showCart: false,
    itemsList: [],
    totalPrice: 0,
    changed: false,
    orderPlaced: false,
  },
  reducers: {
    replaceData(state, action) {
      state.orderPlaced = false;
      state.totalPrice = action.payload.totalPrice
        ? action.payload.totalPrice
        : 0;
      state.itemsList = action.payload.itemsList
        ? action.payload.itemsList
        : [];
    },
    changedOff(state, action) {
      state.changed = false;
    },
    openClose(state, action) {
      state.orderPlaced = false;
      state.showCart = action.payload;
    },
    placeOrder(state, action) {
      state.changed = true;
      state.itemsList = [];
      state.totalPrice = 0;
      state.orderPlaced = true;
    },
    addToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;

      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.total = parseFloat(
          (existingItem.total + newItem.price).toFixed(2)
        );
      } else
        state.itemsList.push({
          id: newItem.id,
          title: newItem.title,
          images: newItem.images,
          quantity: 1,
          price: newItem.price,
          total: newItem.price,
        });
      if (state.orderPlaced) state.orderPlaced = false;
      state.totalPrice = parseFloat(
        (state.totalPrice + newItem.price).toFixed(2)
      );
    },
    removeFromCart(state, action) {
      state.changed = true;
      const item = action.payload;
      state.totalPrice = parseFloat((state.totalPrice - item.total).toFixed(2));
      state.itemsList = state.itemsList.filter((el) => el.id !== item.id);
    },
    changeQuantity(state, action) {
      state.changed = true;
      const value = action.payload.value;
      const item = action.payload.item;
      const existingItem = state.itemsList.find((el) => el.id === item.id);
      if (existingItem.quantity + value === 0) {
        state.totalPrice = parseFloat(
          (state.totalPrice - item.total).toFixed(2)
        );
        state.itemsList = state.itemsList.filter((el) => el.id !== item.id);
      } else {
        existingItem.quantity += value;
        existingItem.total = parseFloat(
          (existingItem.total + value * item.price).toFixed(2)
        );
        state.totalPrice = parseFloat(
          (state.totalPrice + value * item.price).toFixed(2)
        );
      }
    },
  },
});

export default cartSlice;
