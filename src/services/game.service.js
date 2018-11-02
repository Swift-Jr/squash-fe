import {Model} from "react-axiom";
import {userService, UserModel, leagueService} from "./";
import {LeagueModel} from "./league/service";

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

  getOtherUser(userId) {
    return this.getPlayer1().getUserId() === parseInt(userId, 10)
      ? this.getPlayer2()
      : this.getPlayer1();
  }
}

function getLeagueGames(leagueId) {
  return [
    new GameModel({
      id: 1,
      date: "2018-10-02T00:00:00.000",
      league: leagueService.getLeagueById(2),
      player1: userService.getUserById(1),
      player2: userService.getUserById(2),
      player1Score: 9,
      player2Score: 11
    }),
    new GameModel({
      id: 1,
      date: "2018-10-02T00:00:00.000",
      league: leagueService.getLeagueById(2),
      player1: userService.getUserById(2),
      player2: userService.getUserById(3),
      player1Score: 11,
      player2Score: 8
    }),
    new GameModel({
      id: 1,
      date: "2018-10-02T00:00:00.000",
      league: leagueService.getLeagueById(2),
      player1: userService.getUserById(3),
      player2: userService.getUserById(4),
      player1Score: 11,
      player2Score: 9
    }),
    new GameModel({
      id: 1,
      date: "2018-10-02T00:00:00.000",
      league: leagueService.getLeagueById(2),
      player1: userService.getUserById(5),
      player2: userService.getUserById(1),
      player1Score: 4,
      player2Score: 11
    }),
    new GameModel({
      id: 1,
      date: "2018-10-02T00:00:00.000",
      league: leagueService.getLeagueById(2),
      player1: userService.getUserById(3),
      player2: userService.getUserById(5),
      player1Score: 11,
      player2Score: 6
    }),
    new GameModel({
      id: 1,
      date: "2018-10-02T00:00:00.000",
      league: leagueService.getLeagueById(2),
      player1: userService.getUserById(4),
      player2: userService.getUserById(1),
      player1Score: 11,
      player2Score: 6
    }),
    new GameModel({
      id: 1,
      date: "2018-10-02T00:00:00.000",
      league: leagueService.getLeagueById(3),
      player1: userService.getUserById(1),
      player2: userService.getUserById(2),
      player1Score: 11,
      player2Score: 7
    }),
    new GameModel({
      id: 1,
      date: "2018-10-02T00:00:00.000",
      league: leagueService.getLeagueById(3),
      player1: userService.getUserById(1),
      player2: userService.getUserById(4),
      player1Score: 11,
      player2Score: 4
    })
  ];
}

function getUsersGames(userId, leagueId) {
  const games = getLeagueGames().filter(game => {
    return (
      game.getPlayer1().getUserId() === parseInt(userId, 10) ||
      game.getPlayer2().getUserId() === parseInt(userId, 10)
    );
  });

  const leagueFilteredGames = leagueId
    ? games.filter(game => {
        return parseInt(leagueId, 10) === game.getLeague().getId();
      })
    : games;

  return leagueFilteredGames;
}

export const gameService = {
  getLeagueGames,
  getUsersGames
};
