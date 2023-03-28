import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FAKE_DB } from "../../utils/constants";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios(FAKE_DB + "/categories");
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
