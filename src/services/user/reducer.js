import {userTypes as types} from "./types";
import {clubService, leagueService} from "../";

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
        profile: payload.user
      };

    /*case clubService.types.CREATE_CLUB_SUCCESS:
      let newStateWithClub = state;
      newStateWithClub.profile.clubs[payload.club.id] = payload.club;
      return newStateWithClub;

    case leagueService.types.CREATE_LEAGUE_SUCCESS:
      let newStateWithLeague = state;
      newStateWithLeague.clubs = newStateWithLeague.clubs.map(mapClub => {
        if (mapClub.id === payload.league.club_id) {
          mapClub.leagues.push(payload.league);
        }
        return mapClub;
      });

      return newStateWithLeague;

    case leagueService.types.CREATE_GAME_SUCCESS:
      let newStateWithUpdatedLeague = state;
      newStateWithUpdatedLeague.clubs = newStateWithUpdatedLeague.clubs.map(
        mapClub => {
          if (mapClub.id === payload.league.club_id) {
            mapClub.leagues = mapClub.leagues.map(mapLeague => {
              if (mapLeague.id === payload.league.id) {
                return payload.league;
              }
              return mapLeague;
            });
          }
          return mapClub;
        }
      );

      return newStateWithUpdatedLeague;*/
    default:
      break;
  }

  return state;
};
