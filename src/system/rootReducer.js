import {combineReducers} from "redux";

import {user} from "../services/user";
import {alerts} from "../services/alerts";
import {clubService} from "../services";
import {leagueService} from "../services";
import {inviteService} from "../services";

const rootReducer = combineReducers({
  user: user.reducer,
  alerts: alerts.reducer,
  club: clubService.reducer,
  league: leagueService.reducer,
  invites: inviteService.reducer
});

export default rootReducer;
