import { getCookie } from "../../utils/cookies";
import cartSlice from "./cart-slice";
import uiSlice from "../ui/ui-slice";
import { SERVER_API } from "../../utils/serwerRequests";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      let sessionid = getCookie("sessionid");
      const res = await SERVER_API.getCartData(sessionid);
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
      await SERVER_API.putCartData(sessionid, cart);

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
