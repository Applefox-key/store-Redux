import userSlice from "./user-slice";
import uiSlice from "../ui/ui-slice";
import authSlice from "../auth/auth-slice";
import cartSlice from "../cart/cart-slice";
import { SERVER_API } from "../../utils/serwerRequests";

export const getUserData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const data = await SERVER_API.getUserData();
      return data;
    };
    try {
      const userData = await fetchHandler();

      if (userData) {
        dispatch(userSlice.actions.replaceData(userData));
        dispatch(authSlice.actions.login());
      }
    } catch (error) {
      dispatch(
        uiSlice.actions.showNotification({
          message: "Fetching user data request Failed" + error.message,
          type: "error",
        })
      );
    }
  };
};

export const sendUserData = (user) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      await SERVER_API.sendUserData(user);
      dispatch(userSlice.actions.changedOff());
      dispatch(
        uiSlice.actions.showNotification({
          message: "User data Updated",
        })
      );
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiSlice.actions.showNotification({
          message: "Sending user request Failed" + error.message,
          type: "error",
        })
      );
      throw new Error(error.message);
    }
  };
};

export const placeAnOrder = (order) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      // const userid = order.shipmentSettings.id;
      // const orderId = crypto.randomUUID();
      const new_order = {
        "list": order.itemsList,
        "totalPrice": order.totalPrice,
        "state": "processing",
        "dateTime": Date.now(),
        "shipmentSettings": order.shipmentSettings,
      };
      const orderId = await SERVER_API.placeAnOrder(new_order);
      new_order.id = orderId;
      //empty the cart
      dispatch(cartSlice.actions.placeOrder());
      //add new order to the redux store
      dispatch(userSlice.actions.placeOrder(new_order));
      //show notification
      dispatch(
        uiSlice.actions.showNotification({
          message: "An order has been placed",
        })
      );
      return orderId;
    };

    try {
      const orderId = await sendRequest();
      return orderId;
    } catch (error) {
      dispatch(
        uiSlice.actions.showNotification({
          message: "Sending user request Failed" + error.message,
          type: "error",
        })
      );
      throw new Error(error.message);
    }
  };
};
