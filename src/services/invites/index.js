import {invitesActions} from "./actions";
import {invitesReducer} from "./reducer";
import {invitesTypes} from "./types";
import {invitesService} from "./service";

export const inviteService = {
  ...invitesService,
  actions: invitesActions,
  reducer: invitesReducer,
  types: invitesTypes
};

export default inviteService;
