export const getPagesCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};
export const getCurrentPage = ({ offset, limit }) => {
  return Math.ceil(offset + limit / limit);
};
