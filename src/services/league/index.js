import {leagueActions} from "./actions";
import {leagueReducer} from "./reducer";
import {leagueTypes} from "./types";
import {leaguesService} from "./service";

export const leagueService = {
  ...leaguesService,
  actions: leagueActions,
  reducer: leagueReducer,
  types: leagueTypes
};

export default leagueService;
