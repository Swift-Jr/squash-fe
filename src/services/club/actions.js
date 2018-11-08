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

function updateClub(id, attrs) {
  return dispatch => {
    dispatch(request(id, attrs));

    clubService
      .update(id, attrs)
      .then(club => {
        dispatch(success(club));
        dispatch(alerts.actions.good(() => (<div>
          <b>{club.name}</b>&nbsp; is now {
            club.deleted
              ? 'deleted'
              : 'archived'
          }
        </div>)));
      })
      .catch(error => {
        if (!responseHandler(error)) {
          dispatch(failure(error));
        }
      });
  };

  function request(id, attrs) {
    return {
      type: clubService.types.UPDATE_CLUB_REQUEST,
      payload: {
        id,
        attrs
      }
    };
  }

  function success(updatedclub) {
    return {
      type: clubService.types.UPDATE_CLUB_SUCCESS,
      payload: {
        club: updatedclub
      }
    };
  }

  function failure(error) {
    return {type: clubService.types.UPDATE_CLUB_FAILURE, payload: {
        error
      }};
  }
}

export const clubActions = {
  create,
  updateClub
};
