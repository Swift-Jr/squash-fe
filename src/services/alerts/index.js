import {alertActions} from "./actions";
import {alertReducer} from "./reducer";
import {alertTypes} from "./types";
//import {alertService} from "../";

export const alerts = {
  actions: alertActions,
  reducer: alertReducer,
  types: alertTypes
  //service: alertService
};
