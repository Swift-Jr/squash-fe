import axios from "axios";
import moment from "moment";
import history from "../../system/history";
import api from "../../system/api";
import {store, dispatch} from "../../system/store";
import responseHandler from "../../system/responseHandler";

import {alerts, inviteService} from "../../services";

function create(invites, club_id) {
  return api()
    .post("/invites/create/", {invites, club_id})
    .then(response => {
      if (response.status == 202) {
        return response;
      } else if (!responseHandler(response)) {
        throw new Error(
          "Yikes! Ran into an unknown problem trying to create that."
        );
      }
    });
}

function getInvite(token) {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/invites/get_invite/${token}`)
    .then(response => {
      if (response.data.invite) {
        return response.data.invite;
      } else {
        history.push("/login");
        responseHandler(response);
      }
      return false;
    })
    .catch(error => {
      history.push("/login");
      responseHandler(error);
      return false;
    });
}

function getAllInvites() {
  return api()
    .get("/invites/all/")
    .then(response => {
      if (response.status == 200 && response.data.invites) {
        return response.data.invites;
      }
      return [];
    });
}

function getPendingInvites(clubId) {
  let invites = [];
  if (store && store.getState().invites.list) {
    const {list} = store.getState().invites;
    if (clubId) {
      invites = list.filter(invite => invite.club_id === clubId);
    } else {
      invites = list;
    }
    if (invites.length === 0) {
      let {listUpdated} = store.getState().invites;

      if (
        listUpdated === false ||
        moment(listUpdated)
          .add(30, "seconds")
          .isBefore(/* now */)
      ) {
        store.dispatch(inviteService.actions.getAllInvites());
      }
    }
  }
  return invites;
}

export const invitesService = {
  create,
  getInvite,
  getAllInvites,
  getPendingInvites
};

export default invitesService;
