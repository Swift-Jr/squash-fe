import {userService} from '../user.service';
import {userTypes as types} from './types';

const user = {}; // userService.getCurrentUser(false);
const initialState = user ? {authenticated: true, user} : {};

export const userReducer = (state = initialState, action = null) => {
	const {type, payload} = action;

	switch (type) {
		case types.LOGIN_REQUEST:
			return {
				authenticated: false,
				loggingIn: true,
				forward: payload.user.forward,
				loginSubmitted: true
			};
			break;
		case types.LOGIN_SUCCESS:
			return {
				...state,
				authenticated: true,
				loggingIn: false
			};
			break;
		case types.LOGIN_FAILURE:
			return {
				authenticated: false,
				loggingIn: false,
				error: payload.error,
				loginSubmitted: true
			};
			break;
		case types.LOGOUT_SUCCESS:
			return {
				authenticated: false
			};
			break;
		case types.REGISTER_REQUEST:
			return {
				authenticated: false,
				registering: true
			};
			break;
		case types.REGISTER_SUCCESS:
			return {
				authenticated: false,
				registering: false,
				registered: true
			};
			break;
		case types.REGISTER_FAILURE:
			return {
				authenticated: false,
				registering: true,
				registered: false,
				error: payload.error
			};
			break;
		case types.RECOVER_REQUEST:
			return {
				authenticated: false,
				recoverySent: false,
				recoveryRequested: true
			};
			break;
		case types.RECOVER_SUCCESS:
			return {
				authenticated: false,
				recoverySent: true,
				recoveryRequested: false
			};
			break;
		case types.RECOVER_FAILURE:
			return {
				authenticated: false,
				recoverySent: false,
				recoveryRequested: false,
				error: payload.error
			};
			break;
		case types.COMPLETE_RECOVER_REQUEST:
			return {
				...state,
				recoveryComplete: false,
				loading: true,
				error: null
			};
			break;
		case types.COMPLETE_RECOVER_SUCCESS:
			return {
				...state,
				recoveryComplete: true,
				loading: false,
				error: null
			};
			break;
		case types.COMPLETE_RECOVER_FAILURE:
			return {
				...state,
				recoveryComplete: false,
				loading: false,
				error: payload.error
			};
			break;
		case types.RETREIVE_PROFILE:
			return {
				authenticated: state.authenticated,
				profile: payload.user
			};
			break;
		default:
			break;
	}

	return state;
};
