import gameService from "./";

const initialState = {
  list: [],
  listUpdated: false,
  createGame: {
    submitted: false,
    created: false,
    game: null,
    error: null
  }
};

export const gamesReducer = (state = initialState, action = null) => {
  const {type, payload} = action;
  const {types} = gameService;

  switch (type) {
    case types.CREATE_GAME_REQUEST:
      return {
        ...state,
        createGame: {
          submitted: true,
          created: false
        }
      };
    case types.CREATE_GAME_SUCCESS:
      let list = state.list[payload.leagueId] || [];
      list.push(payload.game);

      return {
        ...state,
        createGame: {
          submitted: false,
          created: true,
          game: payload.game
        },
        list: {
          ...state.list,
          [payload.leagueId]: {
            ...state.list[payload.leagueId],
            list
          }
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
    case types.FETCH_GAMES_REQUEST:
      return {
        ...state,
        list: {
          ...state.list,
          [payload.leagueId]: {
            ...(state.list[payload.leagueId] || {list: []}),
            listUpdated: true
          }
        }
      };
    case types.FETCH_GAMES_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          [payload.leagueId]: {
            ...state.list[payload.leagueId],
            listUpdated: false,
            error: payload.error
          }
        }
      };
    case types.FETCH_GAMES_SUCCESS:
      /*let leagueGames = state.list[payload.leagueId] || [];
      leagueGames.concat(payload.matches);*/

      return {
        ...state,
        list: {
          ...state.list,
          [payload.leagueId]: {
            list: payload.matches,
            listUpdated: new Date()
          }
        }
      };
    default:
      break;
  }

  return state;
};
