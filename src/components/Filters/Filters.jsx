import { TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { paramsSlice } from "../../store/params/params-slice";
import Categories from "../Categories/Categories";
import cl from "./Filters.module.scss";

import PriceFilter from "./PriceFilter";

const Filters = () => {
  const dispatch = useDispatch();
  const onChange = (val) => {
    dispatch(paramsSlice.actions.filterTitle(val));
  };
  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap">
      <Categories />
      {/* <PaginationLimit /> */}
      <PriceFilter />
      <div>
        <TextField
          onChange={(e) => onChange(e.target.value)}
          id="filled-search"
          InputLabelProps={{
            shrink: true,
          }}
          label="Search..."
          type="search"
          variant="standard"
        />{" "}
      </div>

      <div className={cl.search}></div>
    </div>
  );
};

export default Filters;
