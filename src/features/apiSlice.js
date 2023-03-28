import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FAKE_DB } from "../utils/constants";
import { makeUrl } from "../utils/query_url";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: FAKE_DB }),
  tagTypes: ["Item", "ItemTotal"],
  endpoints: (builder) => ({
    getItem: builder.query({
      query: (id) => `/products/` + id,
      providesTags: ["Item"],
    }),
    getItems: builder.query({
      query: (atr) => `/products` + makeUrl({ ...atr, isAll: false }),
      providesTags: ["Item"],
    }),
    getItemsTotal: builder.query({
      query: (atr) => `/products` + makeUrl({ ...atr, isAll: true }),
      transformResponse: (res) => res.length,
      providesTags: ["ItemTotal"],
    }),
  }),
});

export const { useGetItemQuery, useGetItemsQuery, useGetItemsTotalQuery } =
  apiSlice;
