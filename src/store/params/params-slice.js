import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_API } from "../../utils/serwerRequests";

export const getTotalPages = createAsyncThunk(
  "params/getTotalPages",
  async (atr, thunkAPI) => {
    try {
      const res = await SERVER_API.getProductsTotalPages(atr);
      return { totalPages: res };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const paramsSlice = createSlice({
  name: "params",
  initialState: {
    filters: { categoryId: "", title: "", price_min: 0, price_max: 0 },
    pagination: { offset: 0, limit: 18 },
    pageState: { page: 0, totalPages: 0, showBtnUp: false },
  },
  reducers: {
    filterTitle(state, action) {
      state.filters.title = action.payload;
      state.pagination.offset = 0;
    },
    filterCategory(state, action) {
      state.filters.categoryId = action.payload;
      state.pagination.offset = 0;
    },
    filterPrice(state, action) {
      if (action.payload.price_min >= 0)
        state.filters.price_min = action.payload.price_min;
      if (action.payload.price_max >= 0)
        state.filters.price_max = action.payload.price_max;
      state.pagination.offset = 0;
    },
    setLimit(state, action) {
      state.pagination.limit = action.payload.limit;
    },
    setTotalPages(state, action) {
      state.pageState.totalPages = action.payload;
    },
    nextPage(state, action) {
      if (action.payload) {
        const page = action.payload.page;
        state.pageState.page = page;
        state.pagination.offset = page * (state.pagination.limit - 1);
      } else {
        state.pageState.page = state.pageState.page + 1;
        state.pagination.offset =
          state.pagination.offset + state.pagination.limit;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTotalPages.fulfilled, (state, action) => {
      // state.pageState.totalPages = Math.ceil(
      //   action.payload.data.length / action.payload.limit
      // );
      state.pageState.totalPages = action.payload.totalPages;
      state.pageState.page = 1;
    });
  },
});
