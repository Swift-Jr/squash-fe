import {gamesActions} from "./actions";
import {gamesReducer} from "./reducer";
import {gamesTypes} from "./types";
import {gamesService} from "./service";

export const gameService = {
  ...gamesService,
  actions: gamesActions,
  reducer: gamesReducer,
  types: gamesTypes
};

export default gameService;
