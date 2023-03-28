import React from "react";
import { Pagination } from "@mui/material";
import { useDispatch } from "react-redux";
import { paramsSlice } from "../../store/params/params-slice";

const ItemsPagination = ({ totalPages }) => {
  const dispatch = useDispatch();

  const handleChange = (e, page) => {
    dispatch(
      paramsSlice.actions.nextPage({
        "page": page,
      })
    );
  };
  return (
    <div>
      <Pagination count={totalPages} onChange={handleChange} />
    </div>
  );
};

export default ItemsPagination;
