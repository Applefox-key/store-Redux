import axios from "axios";
import userSlice from "./user-slice";
import uiSlice from "../ui/ui-slice";
import { FIRE_BASE_DB, USER_ID } from "../../utils/constants";

export const getUserData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await axios.get(`${FIRE_BASE_DB}/${USER_ID}/user.json`);
      const data = res.data;
      return data;
    };
    try {
      const userData = await fetchHandler();

      if (userData) dispatch(userSlice.actions.replaceData(userData));
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
      await axios.put(
        `${FIRE_BASE_DB}/${USER_ID}/user.json`,
        JSON.stringify(user)
      );
      dispatch(userSlice.actions.changedOff());
      dispatch(
        uiSlice.actions.showNotification({
          message: "Favorite's List Updated",
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
    }
  };
};
