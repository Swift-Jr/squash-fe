import axios from "axios";
import history from "../system/history";

import responseHandler from "../system/responseHandler";
import {user} from "./user";
import {alerts} from "./alerts";

let registerAuthChangeFn;

function check() {
  return localStorage.getItem("token") !== null;
}

function registerAuthChange(fn) {
  registerAuthChangeFn = fn;
}

function logout() {
  return dispatch => {
    dispatch(user.actions.logoutRequest());
    localStorage.removeItem("token");
    history.push("/login");
    dispatch(user.actions.logoutSuccess());
  };
}

export const login = (email, password, forward = "/myleagues") => {
  const data = {
    email,
    password,
    forward
  };

  return async dispatch => {
    dispatch(user.actions.loginRequest(data));

    if (data.email && data.password) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/users/authenticate`, data)
        .then(response => {
          const {token} = response.data;
          const userData = response.data.user;
          if (response.status === 202 && token) {
            registerAuthChangeFn && registerAuthChangeFn(true);
            localStorage.setItem("token", token);
            history.push("/");
            dispatch(user.actions.loginSuccess(userData, token));
          } else if (response.data.error) {
            dispatch(user.actions.loginFailure(data, response.data.error));
            dispatch(
              alerts.actions.bad(response.data.error, {
                toastId: "@app/user/login/failed"
              })
            );
          } else {
            responseHandler(response);
            dispatch(
              user.actions.loginFailure(data, "An unknown error occurred")
            );
          }
        })
        .catch(error => {
          responseHandler(error);
          dispatch(user.actions.loginFailure(data, error.toString()));
        });
    } else {
      dispatch(user.actions.loginFailure());
    }
  };
};

export const googleLogin = (googleData, invite, forward = "/myleagues") => {
  return async dispatch => {
    dispatch(user.actions.loginRequest({}));

    if (googleData.tokenObj.id_token) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/users/googleauthenticate`, {
          token: googleData.tokenObj.id_token,
          invite
        })
        .then(response => {
          const {token, google_id} = response.data;
          const userData = response.data.user;
          if (response.status === 202 && token) {
            registerAuthChangeFn && registerAuthChangeFn(true);
            localStorage.setItem("token", token);
            history.push("/");
            dispatch(user.actions.loginSuccess(userData, token, google_id));
          } else if (response.data.error) {
            dispatch(
              user.actions.loginFailure(googleData, response.data.error)
            );
            dispatch(
              alerts.actions.bad(response.data.error, {
                toastId: "@app/user/login/failed"
              })
            );
          } else {
            responseHandler(response);
            dispatch(
              user.actions.loginFailure(googleData, "An unknown error occurred")
            );
          }
        })
        .catch(error => {
          responseHandler(error);
          dispatch(user.actions.loginFailure(googleData, error.toString()));
        });
    } else {
      dispatch(user.actions.loginFailure());
    }
  };
};

export const authService = {
  check,
  login,
  googleLogin,
  logout,
  registerAuthChange
};

// export default authService;
