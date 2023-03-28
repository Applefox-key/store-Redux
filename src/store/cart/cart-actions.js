import axios from "axios";
import { getCookie } from "../../utils/cookies";
import cartSlice from "./cart-slice";
import uiSlice from "../ui/ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      let userid = getCookie("userid");
      const res = await axios.get(
        "https://store-e0684-default-rtdb.firebaseio.com/" +
          userid +
          "/cart.json"
      );
      const data = res.data;

      return data;
    };
    try {
      const cartData = await fetchHandler();
      if (cartData) dispatch(cartSlice.actions.replaceData(cartData));
    } catch (error) {
      dispatch(
        uiSlice.actions.showNotification({
          open: true,
          message: "Fetching cart request Failed " + error.message,
          type: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiSlice.actions.showNotification({
        open: true,
        message: "Updating Cart",
        type: "success",
      })
    );

    const sendRequest = async () => {
      let userid = getCookie("userid");
      dispatch(cartSlice.actions.changedOff());
      await axios.put(
        "https://store-e0684-default-rtdb.firebaseio.com/" +
          userid +
          "/cart.json",
        JSON.stringify(cart)
      );
      dispatch(
        uiSlice.actions.showNotification({
          open: true,
          message: "Cart Updated Successfully",
          type: "success",
        })
      );
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiSlice.actions.showNotification({
          open: true,
          message: "Sending cart request Failed" + error.message,
          type: "error",
        })
      );
    }
  };
};
