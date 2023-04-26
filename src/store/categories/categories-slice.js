import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_API } from "../../utils/serwerRequests";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await SERVER_API.getCategories();
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { categoriesList: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categoriesList = action.payload;
    });
  },
});

export default categoriesSlice;
