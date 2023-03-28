export const makeUrl = ({
  categoryId,
  title,
  price_min,
  price_max,
  offset,
  limit,
  isAll,
}) => {
  let r =
    (title || categoryId || price_min || price_max || offset || limit
      ? "?"
      : "") +
    (title ? "title=" + title + "&" : "") +
    (price_min + price_max
      ? "price_min=" +
        Math.max(1, price_min) +
        "&price_max=" +
        (price_max ? price_max : 9999999999) +
        "&"
      : "") +
    (categoryId ? "categoryId=" + categoryId + "&" : "") +
    (!isAll && offset + limit ? "offset=" + offset + "&limit=" + limit : "");

  return r;
};
