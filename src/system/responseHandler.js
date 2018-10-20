import {alerts} from "../services/alerts";
import {dispatch} from "./store";
import {authService} from "../services/auth.service";

const responseHandler = response => {
  if (response.stack) {
    console.log(response.message);
    console.log(response.stack);
    return false;
  }
  if (response.message) {
    response = {
      ...response.response,
      message: response.message
    };
  }
  switch (response.status) {
    case 400:
      if (response.data.error) {
        dispatch(
          alerts.actions.bad(response.data.error, {
            toastId: "@app/system/response/400/custom"
          })
        );
      } else {
        dispatch(
          alerts.actions.bad("Thats was unexpected. Please try again?", {
            toastId: "@app/system/response/400"
          })
        );
      }
      return false;
    case 500:
      if (response.data.error) {
        dispatch(
          alerts.actions.bad(
            `The server responded with a sad face. (${response.data.error})`,
            {
              toastId: "@app/system/response/500/custom"
            }
          )
        );
      } else {
        dispatch(
          alerts.actions.bad(
            "Seems like we're experiencing server problems. Come back later!",
            {
              toastId: "@app/system/response/500"
            }
          )
        );
      }
      return false;
    case 401:
      if (response.data.error) {
        dispatch(
          alerts.actions.bad(response.data.error, {
            toastId: "@app/system/response/401/custom"
          })
        );
      } else {
        dispatch(
          alerts.actions.bad("Woah! You're not allowed to do that...", {
            toastId: "@app/system/response/401"
          })
        );
      }

      if (!authService.check()) {
        authService.logout();
      }
      return false;
    default:
      return response.data;
  }
};

export default responseHandler;
