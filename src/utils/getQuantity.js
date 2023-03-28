export const getQuantity = (arrCart, item) => {
  if (!arrCart) return "";
  const existingItem = arrCart.find((el) => el.id === item.id);
  return existingItem ? existingItem.quantity : "";
};
