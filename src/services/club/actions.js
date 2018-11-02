import React from "react";
import {clubService} from "./";
import {alerts} from "../alerts";

import responseHandler from "../../system/responseHandler";

function create(name) {
  return dispatch => {
    dispatch(request(name));

    clubService
      .create(name)
      .then(club => {
        dispatch(success(club));
        dispatch(alerts.actions.good(() => (<div>
          Created a new club:&nbsp;<b>{club.name}</b>
        </div>)));
      })
      .catch(error => {
        if (!responseHandler(error)) {
          dispatch(failure(error));
        }
      });
  };

  function request(name) {
    return {type: clubService.types.CREATE_CLUB_REQUEST, payload: {
        name
      }};
  }

  function success(newclub) {
    return {
      type: clubService.types.CREATE_CLUB_SUCCESS,
      payload: {
        club: newclub
      }
    };
  }

  function failure(error) {
    return {type: clubService.types.CREATE_CLUB_FAILURE, payload: {
        error
      }};
  }
}

export const clubActions = {
  create
};
