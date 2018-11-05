import React from "react";
import {inviteService} from "../";
import {alerts} from "../alerts";

import responseHandler from "../../system/responseHandler";

function create(invites, club_id) {
  return dispatch => {
    dispatch(request(invites, club_id));

    return inviteService
      .create(invites, club_id)
      .then((data) => {
        dispatch(success(data.invites, club_id));
        dispatch(alerts.actions.good(() => (<div>
          <b>{data.sent}</b>&nbsp;invites are on their way!
        </div>)));
        return data;
      })
      .catch(error => {
        if (!responseHandler(error)) {
          dispatch(failure(error));
        }
      });
  };

  function request(invites, club_id) {
    return {
      type: inviteService.types.CREATE_INVITE_REQUEST,
      payload: {
        invites,
        club_id
      }
    };
  }

  function success(invites, club_id) {
    return {
      type: inviteService.types.CREATE_INVITE_SUCCESS,
      payload: {
        invites,
        club_id
      }
    };
  }

  function failure(error) {
    return {type: inviteService.types.CREATE_INVITE_FAILURE, payload: {
        error
      }};
  }
}

function getAllInvites() {
  return dispatch => {

    //dispatch(request());

    inviteService
      .getAllInvites()
      .then(invites => {
        dispatch(success(invites));
      })
      .catch(error => {
        if (!responseHandler(error)) {
          //dispatch(failure(error));
        }
      });
  };

  /*function request(clubId) {
    return {type: inviteService.types.FETCH_LEAGUES_REQUEST, payload: {
        clubId
      }};
  }*/

  function success(invites) {
    return {type: inviteService.types.FETCH_INVITES_SUCCESS, payload: {
        invites
      }};
  }

  /*function failure(error) {
    return {type: inviteService.types.FETCH_LEAGUES_FAILURE, payload: {
        error
      }};
  }*/
}

export const invitesActions = {
  create,
  getAllInvites
};
