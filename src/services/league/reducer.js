import leagueService from "./";
import {gameService} from "../";

const initialState = {
  list: [],
  listUpdated: false,
  createLeague: {
    submitted: false,
    created: false,
    league: null,
    error: null
  },
  update: {
    submitted: false,
    updated: false,
    league: null,
    error: null
  }
};

export const leagueReducer = (state = initialState, action = null) => {
  const {type, payload} = action;
  const {types} = leagueService;

  switch (type) {
    case types.CREATE_LEAGUE_REQUEST:
      return {
        ...state,
        createLeague: {
          submitted: true,
          created: false
        }
      };
    case types.CREATE_LEAGUE_SUCCESS:
      return {
        ...state,
        createLeague: {
          submitted: false,
          created: true,
          league: payload.league
        },
        list: state.list.concat([payload.league])
      };
    case types.CREATE_LEAGUE_FAILURE:
      return {
        ...state,
        createLeague: {
          submitted: false,
          created: false,
          league: payload.name,
          error: payload.error
        }
      };
    case types.UPDATE_LEAGUE_REQUEST:
      return {
        ...state,
        update: {
          submitted: true,
          updated: false
        }
      };
    case types.UPDATE_LEAGUE_SUCCESS:
      let leagueList = state.list.filter(
        league => league.id !== payload.league.id
      );
      return {
        ...state,
        update: {
          submitted: false,
          updated: true,
          league: payload.league
        },
        list: leagueList.concat([payload.league])
      };
    case types.UPDATE_LEAGUE_FAILURE:
      return {
        ...state,
        updated: {
          submitted: false,
          updated: false,
          league: payload.league,
          error: payload.error
        }
      };
    case types.FETCH_LEAGUES_REQUEST:
      return {
        ...state,
        listUpdated: true
      };
    case types.FETCH_LEAGUES_FAILURE:
      return {
        ...state,
        listUpdated: false
      };

    case gameService.types.CREATE_GAME_SUCCESS:
    case types.FETCH_LEAGUES_SUCCESS:
      if (payload.league && !payload.leagues)
        payload.leagues = [payload.league];
      let existingLeagues = state.list.filter(league => {
        return (
          payload.leagues.filter(newLeague => league.id === newLeague.id)
            .length === 0
        );
      });
      return {
        ...state,
        list: [...existingLeagues, ...payload.leagues],
        listUpdated: new Date()
      };
    default:
      break;
  }

  return state;
};
