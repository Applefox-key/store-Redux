import React, { useEffect, useRef } from "react";
import ItemCard from "../Items/ItemCard";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { sendUserData } from "../../store/user/user-actions";
import { useObserver } from "../../hooks/useObserver";
import cl from "./Items.module.scss";
import { getTotalPages, paramsSlice } from "../../store/params/params-slice";
import { getItemsBatch } from "../../store/items/items-slice";
import ButtonUp from "../UI/BtnUp";

const Items = () => {
  const { filters, pagination } = useSelector((state) => state.params);
  const { page, totalPages } = useSelector((state) => state.params.pageState);
  const { itemsList, isLoading } = useSelector((state) => state.items);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const lastElement = useRef();

  useObserver(lastElement, page < totalPages, isLoading, () => {
    dispatch(paramsSlice.actions.nextPage());
  });
  useEffect(() => {
    if (user.changed) dispatch(sendUserData(user));
  }, [user, dispatch]);
  useEffect(() => {
    dispatch(getTotalPages({ ...filters, ...pagination }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, dispatch]);
  useEffect(() => {
    dispatch(getItemsBatch({ ...filters, ...pagination }));
  }, [filters, pagination, dispatch]);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex flex-wrap justify-content-center">
        {itemsList && (
          <>
            {itemsList.map((item, i) => (
              <ItemCard item={item} key={i} />
            ))}{" "}
          </>
        )}{" "}
      </div>{" "}
      <div ref={lastElement} className={cl.observerDiv}></div>{" "}
      {itemsList && <ButtonUp />}
      {isLoading && <CircularProgress disableShrink />}
      {/* {totalPages && <ItemsPagination totalPages={totalPages} />} */}
    </div>
  );
};

export default Items;
