import {userTypes as types} from "./types";

const user = {};
const initialState = user ? {authenticated: true, user} : {};

export const userReducer = (state = initialState, action = null) => {
  const {type, payload} = action;

  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        loggingIn: true,
        forward: payload.user.forward,
        loginSubmitted: true
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false
      };
    case types.LOGIN_FAILURE:
      return {
        loggingIn: false,
        error: payload.error,
        loginSubmitted: true
      };
    case types.LOGOUT_SUCCESS:
      return {};
    case types.REGISTER_REQUEST:
      return {
        registering: true
      };
    case types.REGISTER_SUCCESS:
      return {
        registering: false,
        registered: true
      };
    case types.REGISTER_FAILURE:
      return {
        registering: true,
        registered: false,
        error: payload.error
      };
    case types.RECOVER_REQUEST:
      return {};
    case types.RECOVER_SUCCESS:
      return {};
    case types.RECOVER_FAILURE:
      return {
        error: payload.error
      };
    case types.COMPLETE_RECOVER_REQUEST:
      return {
        ...state,
        recoveryComplete: false,
        loading: true,
        error: null
      };
    case types.COMPLETE_RECOVER_SUCCESS:
      return {
        ...state,
        recoveryComplete: true,
        loading: false,
        error: null
      };
    case types.COMPLETE_RECOVER_FAILURE:
      return {
        ...state,
        recoveryComplete: false,
        loading: false,
        error: payload.error
      };
    case types.RETREIVE_PROFILE:
      return {
        profile: payload.user,
        request: {
          submitted: false,
          updated: false
        }
      };
    case types.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        request: {
          submitted: false,
          updated: false,
          error: payload.error
        }
      };
    case types.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        request: {
          submitted: true,
          updated: false
        }
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload.profile,
        request: {
          submitted: false,
          updated: true
        }
      };
    default:
      break;
  }

  return state;
};
