import React, { useEffect, useState } from "react";
import { SERVER_API } from "../../utils/serwerRequests";
import { useSelector } from "react-redux";
import cl from "./Items.module.scss";

const RelatedItems = () => {
  const categoryId = useSelector((state) => state.params.filters.categoryId);
  const [relatedList, setRelatedList] = useState([]);

  const getRelatedItems = async () => {
    const res = await SERVER_API.getProducts({
      categoryId: categoryId,
      offset: 0,
      limit: 5,
    });
    setRelatedList(res.data);
  };
  useEffect(() => {
    getRelatedItems();
  }, []);
  console.log(relatedList);

  return (
    <div className="basic-wrap mt-4 pb-4 pt-4">
      <h4 className={cl["related-header"]}>
        you may be interested in these products.....
      </h4>
      <div className={cl["related-wrap"]}>
        {relatedList.length &&
          relatedList.map((el) => (
            <div className={cl["one-related"]} key={el.id}>
              <img src={el.images[0]} alt="phone" id={"imgS" + el.id} />
              <div className={cl["title"]}>{el.title}</div>
            </div>
          ))}{" "}
      </div>{" "}
    </div>
  );
};

export default RelatedItems;
