import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_API } from "../../utils/serwerRequests";

export const getItemsBatch = createAsyncThunk(
  "items/getItemsBatch",
  async (atr, thunkAPI) => {
    try {
      const res = await SERVER_API.getProducts(atr);
      return { data: res.data, offset: atr.offset };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    itemsList: [],
    isLoading: false,
  },
  reducers: {
    addItems(state, action) {
      if (action.payload) {
        if (!action.payload.offset) state.itemsList = action.payload.data;
        else state.itemsList.concat(action.payload.data);
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getItemsBatch.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getItemsBatch.fulfilled, (state, action) => {
      if (action.payload) {
        if (!action.payload.offset) state.itemsList = action.payload.data;
        else state.itemsList = state.itemsList.concat(action.payload.data);
      }
      state.isLoading = false;
    });
  },
});

export default itemsSlice;
