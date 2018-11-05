import {userActions} from "./actions";
import {userReducer} from "./reducer";
import {userTypes} from "./types";
import {userService as usersService} from "../";

export const user = {
  actions: userActions,
  reducer: userReducer,
  types: userTypes,
  service: usersService
};

export const userService = {
  ...usersService,
  actions: userActions,
  reducer: userReducer,
  types: userTypes
};

export default userService;
