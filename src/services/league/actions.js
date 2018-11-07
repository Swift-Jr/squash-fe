import React from "react";
import {leagueService} from "./";
import {alerts} from "../alerts";

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

export const leagueActions = {
  create,
  getLeagues
};