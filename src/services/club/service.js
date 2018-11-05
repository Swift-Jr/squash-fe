import api from "../../system/api";
import {store} from "../../system/store";
import responseHandler from "../../system/responseHandler";

import {leagueService} from "../../services";

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

  getLeagues() {
    return leagueService.getUsersLeagues(this.state.id);
  }

  getMembers() {
    return this.state.members.map(member => new UserModel(member));
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
  getUserClubs,
  getCurrentClub
};

export default clubsService;
