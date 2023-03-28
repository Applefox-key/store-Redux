import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cart/cart-slice";
import itemsSlice from "./items/items-slice";
import uiSlice from "./ui/ui-slice";
import userSlice from "./user/user-slice";
import categoriesSlice from "./categories/categories-slice";
import { apiSlice } from "../features/apiSlice";
import { paramsSlice } from "./params/params-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    items: itemsSlice.reducer,
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
    categories: categoriesSlice.reducer,
    params: paramsSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
