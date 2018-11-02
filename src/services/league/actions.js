import React from "react";
import {leagueService} from "./";
import {alerts} from "../alerts";
import {store} from "../../system/store";

import responseHandler from "../../system/responseHandler";

function create(name, shortname) {
  return dispatch => {
    dispatch(request(name));

    leagueService
      .create(name, shortname)
      .then(league => {
        dispatch(success(league));
        dispatch(alerts.actions.good(() => (<div>
          New league&nbsp;<b>{league.name}</b>&nbsp; has been created!
        </div>)));
      })
      .catch(error => {
        if (!responseHandler(error)) {
          dispatch(failure(error));
        }
      });
  };

  function request(name) {
    return {type: leagueService.types.CREATE_LEAGUE_REQUEST, payload: {
        name
      }};
  }

  function success(newleague) {
    return {
      type: leagueService.types.CREATE_LEAGUE_SUCCESS,
      payload: {
        league: newleague
      }
    };
  }

  function failure(error) {
    return {type: leagueService.types.CREATE_LEAGUE_FAILURE, payload: {
        error
      }};
  }
}

function getLeagues(clubId) {
  return dispatch => {

    dispatch(request(clubId));

    leagueService
      .getLeagues(clubId)
      .then(leagues => {
        dispatch(success(leagues));
      })
      .catch(error => {
        if (!responseHandler(error)) {
          dispatch(failure(error));
        }
      });
  };

  function request(clubId) {
    return {type: leagueService.types.FETCH_LEAGUES_REQUEST, payload: {
        clubId
      }};
  }

  function success(leagues) {
    return {type: leagueService.types.FETCH_LEAGUES_SUCCESS, payload: {
        leagues
      }};
  }

  function failure(error) {
    return {type: leagueService.types.FETCH_LEAGUES_FAILURE, payload: {
        error
      }};
  }
}

function saveGame(game) {
  return dispatch => {
    dispatch(request(game));

    leagueService
      .saveGame(game)
      .then(updatedLeague => {
        dispatch(success(updatedLeague));
        dispatch(alerts.actions.good('Game saved'));
      })
      .catch(error => {
        if (!responseHandler(error)) {
          dispatch(failure(error));
        }
      });
  };

  function request(game) {
    return {type: leagueService.types.CREATE_GAME_REQUEST, payload: {
        game
      }};
  }

  function success(updatedLeague) {
    return {
      type: leagueService.types.CREATE_GAME_SUCCESS,
      payload: {
        league: updatedLeague
      }
    };
  }

  function failure(error) {
    return {type: leagueService.types.CREATE_GAME_FAILURE, payload: {
        error
      }};
  }
}

export const leagueActions = {
  create,
  saveGame,
  getLeagues
};
