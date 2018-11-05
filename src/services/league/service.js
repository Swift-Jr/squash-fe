import api from "../../system/api";
import {store} from "../../system/store";
import moment from "moment";
import responseHandler from "../../system/responseHandler";

import {clubService, leagueService} from "../../services";

import {Model} from "react-axiom";
import {UserModel} from "../user.service";
import {ClubModel} from "../club/service";

export class LeagueModel extends Model {
  static defaultState() {
    return {
      id: null,
      created: null,
      owner: new UserModel(),
      club: new ClubModel(),
      name: null,
      shortname: null,
      results: []
    };
  }

  getOwner() {
    return new UserModel(this.state.owner);
  }

  getClub() {
    return new ClubModel(this.state.club);
  }

  getResults() {
    return this.state.results.map(result => new LeagueResult(result));
  }
}

export class LeagueResult extends Model {
  static defaultState() {
    return {
      player: new UserModel(),
      place: null,
      matchesPlayed: null,
      matchesLost: null,
      matchesWon: null,
      won: null,
      pointsWon: null,
      pointsLost: null,
      scoreDiff: null,
      scoreMargin: null,
      scorePoints: null
    };
  }

  getPlayer() {
    return new UserModel(this.state.player);
  }
}

function create(name, shortname) {
  const newLeague = {
    name,
    shortname,
    club_id: clubService.getUserClubs()[0].getId()
  };

  return api()
    .post("/league/create/", newLeague)
    .then(response => {
      if (response.status === 202 && response.data.league) {
        return response.data.league;
      } else if (!responseHandler(response)) {
        throw new Error(
          "Yikes! Ran into an unknown problem trying to create that."
        );
      }
    });
}

function getLeagues(clubId) {
  return api()
    .get("/me/leagues/" + clubId)
    .then(response => {
      if (response.status === 200 && response.data.leagues) {
        return response.data.leagues;
      }
      return [];
    });
}

function getUsersLeagues(clubId) {
  let leagues = [];

  if (store && store.getState().league.list) {
    const {list} = store.getState().league;

    if (clubId === undefined) {
      clubId = clubService.getCurrentClub().getId();
    }

    if (clubId) {
      leagues = list.filter(league => league.club_id === clubId);
    } else {
      leagues = list;
    }
    if (leagues.length === 0) {
      let {listUpdated} = store.getState().league;

      if (listUpdated !== true) {
        if (
          listUpdated === false ||
          moment(listUpdated)
            .add(5, "seconds")
            .isBefore(/* now */)
        ) {
          store.dispatch(leagueService.actions.getLeagues(clubId));
        }
      }
    }
  }
  return leagues
    .map(league => new LeagueModel(league))
    .sort(
      (a, b) => (!a.getLastGame() || a.getLastGame() < b.getLastGame() ? 1 : -1)
    );
}

function getLeagueById(id) {
  return getUsersLeagues().filter(
    league => league.getId() === parseInt(id, 10)
  )[0];
}

function getUserScorecard(userId, leagues) {
  var gamesPlayed = 0,
    gamesWon = 0,
    gamesLost = 0,
    pointsWon = 0,
    pointsLost = 0;

  leagues.forEach(league => {
    const result = league
      .getResults()
      .filter(
        result => result.getPlayer().getUserId() === parseInt(userId, 10)
      )[0];

    if (result) {
      gamesPlayed += result.getMatchesPlayed();
      gamesWon += result.getMatchesWon();
      gamesLost += result.getMatchesLost();
      pointsWon += result.getPointsWon();
      pointsLost += result.getPointsLost();
    }
  });

  const scores = {
    gamesPlayed: gamesPlayed,
    gamesWon: gamesWon,
    gamesLost: gamesLost,
    pointsWon: pointsWon,
    pointsLost: pointsLost
  };

  return scores;
}

export const leaguesService = {
  create,
  getUsersLeagues,
  getLeagueById,
  getUserScorecard,
  getLeagues
};

export default leaguesService;
