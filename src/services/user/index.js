import {userActions} from "./actions";
import {userReducer} from "./reducer";
import {userTypes} from "./types";
import {userService} from "../";

export const user = {
  actions: userActions,
  reducer: userReducer,
  types: userTypes,
  service: userService
};
