import axios from "axios";
import {Model} from "react-axiom";
import moment from "moment";
import history from "../../system/history";
import api from "../../system/api";
import {store, dispatch} from "../../system/store";
import responseHandler from "../../system/responseHandler";

import {alerts, gameService, leagueService} from "../../services";
import {UserModel} from "../../services/user.service";
import {LeagueModel} from "../../services/league/service";

class GameModel extends Model {
  static defaultState() {
    return {
      id: null,
      date: null,
      league: new LeagueModel(),
      player1: new UserModel(),
      player2: new UserModel(),
      player1Score: 0,
      player2Score: 0
    };
  }

  getPlayer1() {
    return new UserModel(this.state.player1);
  }

  getPlayer2() {
    return new UserModel(this.state.player2);
  }

  getLeague() {
    return leagueService.getLeagueById(this.state.league_id);
  }

  getOtherUser(userId) {
    return this.getPlayer1().getUserId() === parseInt(userId, 10)
      ? this.getPlayer2()
      : this.getPlayer1();
  }
}

function saveGame(game) {
  const newGame = {
    league: game.league.getId(),
    player1: game.player1.getId(),
    player2: game.player2.getId(),
    player1score: game.player1score,
    player2score: game.player2score
  };

  return api()
    .post("/league/save_game/", newGame)
    .then(response => {
      if (response.status == 202 && response.data.league) {
        //TODO:Could store games locally to be saved when offline
        return response.data.league;
      } else if (!responseHandler(response)) {
        throw new Error(
          "Yikes! Ran into an unknown problem trying to create that."
        );
      }
    });
}

function getAllGames(leagueId) {
  return api()
    .get("/game/all/" + leagueId)
    .then(response => {
      if (response.status == 200 && response.data.matches) {
        return response.data.matches;
      }
      return [];
    });
}

function getLeagueGames(leagueId) {
  let games = [];
  if (store && store.getState().games.list) {
    const list = store.getState().games.list[leagueId] || [];
    if (leagueId) {
      games = list.filter(game => game.league_id === leagueId);
    } else {
      games = list;
    }
    if (games.length === 0) {
      let {listUpdated} = store.getState().games;

      if (
        listUpdated === false ||
        moment(listUpdated)
          .add(5, "seconds")
          .isBefore(/* now */)
      ) {
        store.dispatch(gameService.actions.getAllGames(leagueId));
      }
    }
  }
  return games.map(game => new GameModel(game));
}

export const gamesService = {
  saveGame,
  getAllGames,
  getLeagueGames
};

export default gamesService;
