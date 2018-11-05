import {clubActions} from "./actions";
import {clubReducer} from "./reducer";
import {clubTypes} from "./types";
import {clubsService} from "./service";

export const clubService = {
  ...clubsService,
  actions: clubActions,
  reducer: clubReducer,
  types: clubTypes
};

export default clubService;
