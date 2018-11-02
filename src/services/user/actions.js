import {userTypes as types} from "./types";

import {user} from "../user";

const loginRequest = user => ({
  type: types.LOGIN_REQUEST,
  payload: {user: user}
});

const loginSuccess = (userData, token) => {
  return dispatch => {
    dispatch(user.service.getUserProfile());
    return {
      type: types.LOGIN_SUCCESS,
      payload: {user: userData, token: token}
    };
  };
};

const loginFailure = (user, error) => ({
  type: types.LOGIN_FAILURE,
  payload: {user: user, error: error}
});

const registerRequest = user => ({
  type: types.REGISTER_REQUEST,
  payload: {user: user}
});

const registerSuccess = (user, token) => ({
  type: types.REGISTER_SUCCESS,
  payload: {user: user}
});

const registerFailure = (user, error) => ({
  type: types.REGISTER_FAILURE,
  payload: {user: user, error: error}
});

const recoverRequest = email => ({
  type: types.RECOVER_REQUEST,
  payload: {email}
});

const recoverSuccess = email => ({
  type: types.RECOVER_SUCCESS,
  payload: {email}
});

const recoverFailure = (email, error) => ({
  type: types.RECOVER_FAILURE,
  payload: {email, error}
});

const completeRecoverRequest = () => ({
  type: types.COMPLETE_RECOVER_REQUEST,
  payload: {}
});

const completeRecoverSuccess = () => ({
  type: types.COMPLETE_RECOVER_SUCCESS,
  payload: {}
});

const completeRecoverFailure = error => ({
  type: types.COMPLETE_RECOVER_FAILURE,
  payload: {error}
});

const logoutRequest = () => ({
  type: types.LOGOUT_REQUEST,
  payload: {}
});

const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS,
    payload: {}
  };
};

const logoutFailure = error => ({
  type: types.LOGOUT_FAILURE,
  payload: {error}
});

const getUserProfile = profile => ({
  type: types.RETREIVE_PROFILE,
  payload: {...profile}
});

export const userActions = {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  recoverRequest,
  recoverSuccess,
  recoverFailure,
  completeRecoverRequest,
  completeRecoverSuccess,
  completeRecoverFailure,
  getUserProfile
};
