import leagueService from "./";

const initialState = {
  list: [],
  listUpdated: false,
  createLeague: {
    submitted: false,
    created: false,
    league: null,
    error: null
  },
  createGame: {
    submitted: false,
    created: false,
    game: null,
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
    case types.CREATE_GAME_REQUEST:
      return {
        ...state,
        createGame: {
          submitted: true,
          created: false
        }
      };
    case types.CREATE_GAME_SUCCESS:
      return {
        ...state,
        createGame: {
          submitted: false,
          created: true,
          game: payload.game
        }
      };
    case types.CREATE_GAME_FAILURE:
      return {
        ...state,
        createGame: {
          submitted: false,
          created: false,
          game: payload.game,
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
    case types.FETCH_LEAGUES_SUCCESS:
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
