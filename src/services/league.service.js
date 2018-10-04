import { Model } from 'react-axiom';
import {userService, UserModel} from './';

export class LeagueModel extends Model {
  static defaultState() {
    return {
      id: null,
      shortName: null,
      name: null,
      results: [new LeagueResult()]
    };
  }
}

class LeagueResult extends Model {
  static defaultState() {
    return {
      player: new UserModel(),
      place: null,
      played: null,
      won: null,
      pointsWon: null,
      pointsLost: null,
      score: null
    };
  }
}

function getUsersLeagues(userId) {
  const sampleLeagues = [
    {
      id: 1,
      name: "Tuesdays Nines",
      shortName: "Tues 9s",
      results: []
    }, {
      id: 2,
      name: "Tuesday 11s",
      shortName: "Tues 11s",
      results: [
        new LeagueResult({
          player: userService.getUserById(1),
          place: 1,
          played: 12,
          won: 10,
          pointsWon: 30,
          pointsLost: 5,
          score: 56
        }), new LeagueResult({
          player: userService.getUserById(2),
          place: 2,
          played: 12,
          won: 10,
          pointsWon: 30,
          pointsLost: 5,
          score: 56
        }), new LeagueResult({
          player: userService.getUserById(3),
          place: 3,
          played: 12,
          won: 10,
          pointsWon: 30,
          pointsLost: 5,
          score: 56
        }), new LeagueResult({
          player: userService.getUserById(4),
          place: 4,
          played: 12,
          won: 10,
          pointsWon: 30,
          pointsLost: 5,
          score: 56
        }), new LeagueResult({
          player: userService.getUserById(5),
          place: 5,
          played: 12,
          won: 10,
          pointsWon: 30,
          pointsLost: 5,
          score: 56
        })
      ]
    },{
      id: 3,
      name: "Wednesday 5s",
      shortName: "Weds 5s",
      results: [
        new LeagueResult({
          player: userService.getUserById(1),
          place: 1,
          played: 12,
          won: 5,
          pointsWon: 15,
          pointsLost: 3,
          score: 24
        }), new LeagueResult({
          player: userService.getUserById(2),
          place: 2,
          played: 12,
          won: 10,
          pointsWon: 30,
          pointsLost: 5,
          score: 56
        })
      ]
    }
  ];

  return sampleLeagues.map(league => new LeagueModel(league));
}

function getLeagueById(id) {
  return getUsersLeagues().filter((league)=> league.getId() === parseInt(id, 10))[0];
}

function getUserScorecard(userId, leagues){
  var gamesPlayed = 0,
    gamesWon = 0,
    gamesLost = 0,
    pointsWon = 0,
    pointsLost = 0;

  leagues.forEach((league) => {
    const result = league.getResults().filter((result) => result.getPlayer().getUserId() === parseInt(userId, 10))[0];

    if (result) {
      gamesPlayed += result.getPlayed();
      gamesWon += result.getWon();
      gamesLost += result.getPlayed() - result.getWon();
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

export const leagueService = {
  getUsersLeagues,
  getLeagueById,
  getUserScorecard
};
