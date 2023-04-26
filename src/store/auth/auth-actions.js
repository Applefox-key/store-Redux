import { getCookie } from "../../utils/cookies";
import uiSlice from "../ui/ui-slice";
import authSlice from "./auth-slice";
import { userActions } from "../user/user-slice";
import { userInitialState } from "../../utils/userDataStruct";
import { getUserData, sendUserData } from "../user/user-actions";
import { UserId_URL } from "../../utils/query_url";
import { SERVER_API } from "../../utils/serwerRequests";

export const closeSession = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      let sessionid = getCookie("sessionid");
      await SERVER_API.logout(sessionid);
      dispatch(authSlice.actions.logout());
      dispatch(userActions.resetData());
    };
    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiSlice.actions.showNotification({
          open: true,
          message: "Session close request Failed" + error.message,
          type: "error",
        })
      );
    }
  };
};
export const authorization = (userData, isNew) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      //code an email value
      const userid = await UserId_URL(userData.email);
      //add userid to the session
      let sessionid = getCookie("sessionid");
      await SERVER_API.login(sessionid, userid);
      if (isNew) {
        //formatting users data
        const { passwordConfirm, ...data_for_send } = userData;
        //add userid
        data_for_send.id = userid;
        //add new users data to the store
        dispatch(userActions.changeData(data_for_send));
        //send userd data to the DB
        dispatch(
          sendUserData({
            ...userInitialState,
            profile: {
              ...userInitialState.profile,
              ...data_for_send,
            },
          })
        );
        //set isLoggin to true value
        dispatch(authSlice.actions.login());
      } else {
        //get user data for it's id (email)
        dispatch(getUserData());
      }

      dispatch(
        uiSlice.actions.showNotification({
          open: true,
          message: "Session Updated Successfully",
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
          message: "Signin request Failed" + error.message,
          type: "error",
        })
      );
    }
  };
};
