import { Model } from 'react-axiom';
import {gameService, leagueService} from './';

export class UserModel extends Model {
  static defaultState() {
    return {
      id:null,
      firstname:null,
      lastname:null
    };
  }
  getUserId () {return this.getId();}

  getClubs () {
    const clubs = [{id:1, name:'420 Club'}];
    return clubs;}

  getLeagues () {
    return leagueService.getUsersLeagues(this.getUserId());
  }

  getLeagueById(id) {
    return this.getLeagues.filter((league)=> league.getId() === parseInt(id, 10))[0];
  }

  getGames(leagueId, player2) {
    const games = gameService.getUsersGames(this.getUserId(), leagueId);

    return player2 ? games.filter((game)=>{
      return game.getPlayer1().getUserId() === parseInt(player2, 10) || game.getPlayer2().getUserId() === parseInt(player2, 10);
    }): games;
  }
}

function getCurrentUser(){
  //return getUserById(authService.getUserId());

  return new UserModel({
    id: 1,
    firstname: 'Rob',
    lastname: 'Guard'
  });
}

function getUserById(id){
  switch(id){
    case 1:
      return getCurrentUser();
    break;
    case 2:
      return new UserModel({
        id: 2,
        firstname: 'Gavin',
        lastname: 'Brooks'
      });
    break;
    case 3:
      return new UserModel({
        id: 3,
        firstname: 'Perry',
        lastname: 'Charrington'
      });
    break;
    case 4:
      return new UserModel({
        id: 4,
        firstname: 'Tom',
        lastname: 'Elliot'
      });
    break;
    case 5:
      return new UserModel({
        id: 5,
        firstname: 'Brent',
        lastname: 'Mayger'
      });
    break;
    default:
    return getCurrentUser();
  }
}

function createUser(user){
  return true;
}

function requestRecoverAccount(email){
  return true;
}

function getInvite(inviteId){
  return {
    inviteId: '123',
    email:'someone@someone.com'
  };
}

export const userService = {
  getCurrentUser,
  getUserById,
  createUser,
  requestRecoverAccount,
  getInvite
};
