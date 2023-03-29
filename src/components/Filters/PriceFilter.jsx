import { TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { paramsSlice } from "../../store/params/params-slice";

const PriceFilter = () => {
  const { price_min, price_max } = useSelector((state) => state.params.filters);
  const dispatch = useDispatch();
  const changePrice = (event) => {
    const val = event.target.value ? parseInt(event.target.value) : 0;
    if (val < 0) return;
    const atr = { price_min: price_min, price_max: price_max };

    atr[event.target.id] = val;

    dispatch(paramsSlice.actions.filterPrice(atr));
  };
  console.log("price_min", price_min);
  console.log("price_max", price_max);

  return (
    <>
      <TextField
        size="small"
        id="price_min"
        label="price min"
        // type="number"
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
        // type="number"
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
