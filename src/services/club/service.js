import api from "../../system/api";
import {store} from "../../system/store";
import responseHandler from "../../system/responseHandler";

import {leagueService, inviteService} from "../../services";

import {Model} from "react-axiom";
import {UserModel} from "../user.service";

export class ClubModel extends Model {
  static defaultState() {
    return {
      id: null,
      created: null,
      owner: new UserModel(),
      name: null,
      members: []
    };
  }

  getLeagues(archived = false) {
    return leagueService.getUsersLeagues(this.state.id, archived);
  }

  getMembers() {
    return this.state.members.map(member => new UserModel(member));
  }

  getInvites() {
    if (!this.state.invites) {
      this.state.invites = inviteService.getPendingInvites(this.state.id);
    }
    return this.state.invites;
  }

  hasPlayers() {
    return this.state.members.length > 1;
  }

  hasLeagues() {
    return this.state.leagues.length > 0;
  }
}

function create(name) {
  const club = {
    name
  };

  return api()
    .post("/club/create/", club)
    .then(response => {
      if (response.status === 202 && response.data.club) {
        return response.data.club;
      } else if (!responseHandler(response)) {
        throw new Error(
          "Yikes! Ran into an unknown problem trying to create that."
        );
      }
    });
}

function update(id, attrs) {
  const data = {
    id,
    attrs
  };

  return api()
    .post("/club/update/", data)
    .then(response => {
      if (response.status === 202 && response.data.club) {
        return response.data.club;
      } else if (!responseHandler(response)) {
        throw new Error(
          "Yikes! Ran into an unknown problem trying to update that."
        );
      }
    });
}

function getUserClubs() {
  let userClubsData = [];

  if (store && store.getState().club.list) {
    userClubsData = store.getState().club.list;
  }

  return userClubsData.map(club => new ClubModel(club));
}

function getCurrentClub() {
  let selectedClub = {};

  if (store && store.getState().club.selectedClub) {
    selectedClub = store.getState().club.selectedClub;
  }

  return new ClubModel(selectedClub);
}

export const clubsService = {
  create,
  update,
  getUserClubs,
  getCurrentClub
};

export default clubsService;
