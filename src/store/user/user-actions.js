import axios from "axios";
import userSlice from "./user-slice";
import uiSlice from "../ui/ui-slice";
import { FIRE_BASE_DB, SESSION_ID } from "../../utils/constants";
import authSlice from "../auth/auth-slice";
import cartSlice from "../cart/cart-slice";

export const getUserData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const dataReq = await axios.get(
        `${FIRE_BASE_DB}/sessions/${SESSION_ID}/user.json`
      );
      if (!dataReq.data) return "";
      const userid = dataReq.data;
      const res = await axios.get(`${FIRE_BASE_DB}/users/${userid}/user.json`);
      const data = res.data;
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
      const userid = user.profile.id;
      await axios.put(
        `${FIRE_BASE_DB}/users/${userid}/user.json`,
        JSON.stringify(user)
      );
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
      const userid = order.shipmentSettings.id;
      const orderId = crypto.randomUUID();
      const new_order = {
        "id": orderId,
        "list": order.itemsList,
        "totalPrice": order.totalPrice,
        "state": "processing",
        "dateTime": Date.now(),
        "shipmentSettings": order.shipmentSettings,
      };
      //send order to the server -and get an order id from a real server
      await axios.put(
        `${FIRE_BASE_DB}/users/${
          userid ? userid + "/user" : "GUESTS"
        }/orders/${orderId}.json`,
        JSON.stringify(new_order)
      );
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
