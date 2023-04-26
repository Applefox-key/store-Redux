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

export const UserId_URL = async (email) => {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(email)
  );
  const hex = Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex;
};
