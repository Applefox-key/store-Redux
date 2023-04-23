import axios from "axios";
import { getCookie } from "../../utils/cookies";
import cartSlice from "./cart-slice";
import uiSlice from "../ui/ui-slice";
import { FIRE_BASE_DB } from "../../utils/constants";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      let sessionid = getCookie("sessionid");
      const res = await axios.get(
        FIRE_BASE_DB + "/sessions/" + sessionid + "/cart.json"
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
      let sessionid = getCookie("sessionid");
      dispatch(cartSlice.actions.changedOff());
      await axios.put(
        FIRE_BASE_DB + "/sessions/" + sessionid + "/cart.json",
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
