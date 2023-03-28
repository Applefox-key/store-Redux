import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { paramsSlice } from "../../store/params/params-slice";

const PaginationLimit = () => {
  const limit = useSelector((state) => state.params.pagination.limit);

  const dispatch = useDispatch();
  const onSelect = (e) => {
    dispatch(paramsSlice.actions.setLimit(parseInt(e.target.value)));
  };

  const options = [
    { value: 5, name: "5" },
    { value: 10, name: "10" },
    { value: 25, name: "25" },
    { value: 0, name: "show all" },
  ];
  return (
    <div className="d-flex align-items-center" style={{ width: "6.1rem" }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="limit-select">
          items on the page
        </InputLabel>
        <NativeSelect
          onChange={onSelect}
          value={limit}
          inputProps={{
            name: "",
            id: "limit-select",
          }}>
          {options.length &&
            options.map((el) => (
              <option key={el.name} value={el.value}>
                {el.name}
              </option>
            ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default PaginationLimit;
