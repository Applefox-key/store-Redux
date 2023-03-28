import { TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { paramsSlice } from "../../store/params/params-slice";

const PriceFilter = () => {
  const dispatch = useDispatch();
  const { price_min, price_max } = useSelector((state) => state.params.filters);

  const changePrice = (event) => {
    if (parseInt(event.target.value) < 0) return;
    const atr = { price_min: price_min, price_max: price_max };
    atr[event.target.id] = parseInt(event.target.value);
    dispatch(paramsSlice.actions.filterPrice(event.target.id));
  };
  return (
    <>
      <TextField
        size="small"
        id="price_min"
        label="price min"
        type="number"
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
        value={price_min}
        onChange={changePrice}
      />{" "}
      <TextField
        size="small"
        id="price_max"
        label="price max"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        value={price_max}
        onChange={changePrice}
      />
    </>
  );
};

export default PriceFilter;
