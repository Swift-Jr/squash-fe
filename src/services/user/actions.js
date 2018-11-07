import React from "react";

import {userTypes as types} from "./types";

import {userService, alerts} from "../";
import responseHandler from "../../system/responseHandler";

const loginRequest = user => ({
  type: types.LOGIN_REQUEST,
  payload: {user: user}
});

const loginSuccess = (userData, token, google_id) => {
  return dispatch => {
    dispatch(userService.getUserProfile());
    return {
      type: types.LOGIN_SUCCESS,
      payload: {user: userData, token, google_id}
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

function updateProfile(profile) {
  return dispatch => {
    dispatch(request(profile));

    return userService
      .updateProfile(profile)
      .then(data => {
        dispatch(success(data.profile));
        dispatch(
          alerts.actions.good(() => <div>Your profile has been updated!</div>)
        );
        return data;
      })
      .catch(error => {
        if (!responseHandler(error)) {
          dispatch(failure(error));
        }
      });
  };

  function request(profile) {
    return {
      type: types.UPDATE_PROFILE_REQUEST,
      payload: {
        profile
      }
    };
  }

  function success(invites, club_id) {
    return {
      type: types.UPDATE_PROFILE_SUCCESS,
      payload: {
        profile
      }
    };
  }

  function failure(error) {
    return {
      type: types.UPDATE_PROFILE_FAILURE,
      payload: {
        error
      }
    };
  }
}

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
  getUserProfile,
  updateProfile
};
