import {gameService} from "./";
import {userService} from "../";
import {alerts} from "../alerts";

import responseHandler from "../../system/responseHandler";

const gameWinningResponses = [
  'Hell yeah! Smashed it!',
  'Go go go! Well done!',
  'Booyah! Thats how you play',
  'Awww yeeeeah!',
  'BOOM TIME!',
  'Right out of the park!',
  'Absofuckinglutly mate!'
];

const gameLosingResponses = [
  'Ah you got beat. Bad luck.',
  'HA! You poor sucker. Not made for winning',
  'How do you feel being a mop? Like a loser!',
  'You been smashed, repeatedly. Gonna win soon?',
  'Ha ha ha ha. No, good try. Hahaha.',
  'Gotta stop losing, Punk!'
];

function saveGame(game) {
  return dispatch => {
    dispatch(request(game));

    return gameService
      .saveGame(game)
      .then(updatedLeague => {
        let message = "Game saved!";
        let me = userService
          .getCurrentUser()
          .getUserId();
        if (game.player1.getId() === me || game.player2.getId() === me) {
          if ((game.player1.getId() === me && game.player1score > game.player2score) || (game.player2.getId() === me && game.player2score > game.player1score)) {
            message = gameWinningResponses[Math.floor(Math.random() * gameWinningResponses.length)];
          } else {
            message = gameLosingResponses[Math.floor(Math.random() * gameLosingResponses.length)];
          }
        }
        dispatch(success(updatedLeague));
        dispatch(alerts.actions.good(message));
      })
      .catch(error => {
        if (!responseHandler(error)) {
          dispatch(failure(error));
        }
      });
  };

  function request(game) {
    return {type: gameService.types.CREATE_GAME_REQUEST, payload: {
        game
      }};
  }

  function success(updatedLeague) {
    return {
      type: gameService.types.CREATE_GAME_SUCCESS,
      payload: {
        league: updatedLeague
      }
    };
  }

  function failure(error) {
    return {type: gameService.types.CREATE_GAME_FAILURE, payload: {
        error
      }};
  }
}

function getAllGames(leagueId = null) {
  return dispatch => {

    dispatch(request(leagueId));

    return gameService
      .getAllGames(leagueId)
      .then(matches => {
        dispatch(success(leagueId, matches));
        return matches
      })
      .catch(error => {
        if (!responseHandler(error)) {
          dispatch(failure(leagueId, error));
        }
      });
  };

  function request(leagueId) {
    return {type: gameService.types.FETCH_GAMES_REQUEST, payload: {
        leagueId
      }};
  }

  function success(leagueId, matches) {
    return {
      type: gameService.types.FETCH_GAMES_SUCCESS,
      payload: {
        leagueId,
        matches
      }
    };
  }

  function failure(leagueId, error) {
    return {
      type: gameService.types.FETCH_GAMES_FAILURE,
      payload: {
        leagueId,
        error
      }
    };
  }
}

export const gamesActions = {
  saveGame,
  getAllGames
};
