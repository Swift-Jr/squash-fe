import {combineReducers} from "redux";

import {user} from "../services/user";
import {alerts} from "../services/alerts";

const rootReducer = combineReducers({
  user: user.reducer,
  alerts: alerts.reducer
});

export default rootReducer;
