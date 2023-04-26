import React, { useEffect, useState } from "react";
import cl from "./Items.module.scss";

import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useGetItemQuery } from "../../features/apiSlice";
import { allRouts } from "../../routes/routes";

import FavoriteBtn from "../Favorite/FavoriteBtn";
import BtnAddToCart from "../UI/BtnAddToCart";
import RelatedItems from "./RelatedItems";

const SingleItem = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const router = useNavigate();
  const { id } = useParams();

  const { data, isLoading, isFetching, isSuccess } = useGetItemQuery(id);

  useEffect(() => {
    if (!isLoading && !isFetching && !isSuccess) router(allRouts.HOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, isSuccess]);

  return !data ? (
    <CircularProgress disableShrink />
  ) : (
    <>
      <div className={cl.singleCard}>
        {" "}
        <img
          className={cl.imgBig}
          src={data.images[currentImg]}
          alt="imageitem"
        />
        <div className={cl.imgCloneDivS} id={"imgDivS" + data.id}>
          <img
            className={cl.imgCloneS}
            src={data.images[0]}
            alt="phone"
            id={"imgS" + data.id}
          />
        </div>
        <div className={cl.imgPrew}>
          {data.images.map((oneImg, i) => (
            <img
              src={oneImg}
              key={i}
              alt="imageitem"
              className={i === currentImg ? cl.imgBorder : ""}
              onClick={(e) => {
                setCurrentImg(i);
              }}
            />
          ))}
        </div>
        <div className={cl.textDiv}>
          <h3>{data.title}</h3>{" "}
          <div className="d-flex align-items-center justify-content-between">
            <h2>
              <b>{data.price}$</b>
            </h2>{" "}
            <FavoriteBtn item={data} style={{ position: "relative" }} />
            <BtnAddToCart item={data} />
          </div>
          <div className={cl.description}>{data.description}</div>
          {/* <div className="text-left fs-4 mt-5">{data.description}</div> */}
        </div>
      </div>
      <RelatedItems />
    </>
  );
};

export default SingleItem;
