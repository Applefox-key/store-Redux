import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/categories/categories-slice";
import { paramsSlice } from "../../store/params/params-slice";

const Categories = () => {
  const categoriesList = useSelector(
    (state) => state.categories.categoriesList
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = (e) => {
    dispatch(
      paramsSlice.actions.filterCategory(
        e.target.value === "all items" ? "" : e.target.value
      )
    );
  };

  return (
    <div className="d-flex align-items-center">
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="category-select">
          Category
        </InputLabel>
        <NativeSelect
          onChange={onSelect}
          defaultValue={30}
          inputProps={{
            name: "",
            id: "category-select",
          }}>
          <option value="all items">all items</option>
          {categoriesList.length &&
            categoriesList.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default Categories;
