import axios from "axios";
import {Model} from "react-axiom";

import responseHandler from "../system/responseHandler";
import history from "../system/history";
import api from "../system/api";
import store from "../system/store";
import {alerts} from "./alerts";
import {user} from "./user";
import {ClubModel} from "./club/service";
import {gameService, authService, clubService} from ".";

export class UserModel extends Model {
  static defaultState() {
    return {
      id: null,
      firstname: null,
      lastname: null,
      clubs: []
    };
  }

  getUserId() {
    return this.getId();
  }

  getClubs() {
    return this.state.clubs.map(club => new ClubModel(club));
  }

  getLeagueById(id) {
    return this.getLeagues.filter(
      league => league.getId() === parseInt(id, 10)
    )[0];
  }

  getGames(leagueId, player2) {
    const games = gameService.getUsersGames(this.getUserId(), leagueId);
    return player2
      ? games.filter(game => {
          return (
            game.getPlayer1().getUserId() === parseInt(player2, 10) ||
            game.getPlayer2().getUserId() === parseInt(player2, 10)
          );
        })
      : games;
  }
}

function getCurrentUser() {
  let userData = {};

  if (store) {
    userData = store.getState().user.profile;
  }

  return new UserModel(userData);
}

function userHasPlayers() {
  const usersClubs = clubService.getUserClubs();

  const clubsWithPlayers = usersClubs.filter(clubToCheck => {
    return clubToCheck.hasPlayers();
  });

  return clubsWithPlayers.length > 0;
}

function userHasLeagues() {
  const usersClubs = clubService.getUserClubs();

  const clubsWithLeagues = usersClubs.filter(clubToCheck => {
    return clubToCheck.hasLeagues();
  });

  return clubsWithLeagues.length > 0;
}

function userHasClubs() {
  const usersClubs = clubService.getUserClubs();

  return usersClubs.length > 0;
}

function getUserProfile() {
  return async dispatch => {
    return await api()
      .get("/me/")
      .then(response => {
        if (response.status === 200) {
          const action = user.actions.getUserProfile(response.data);
          dispatch(action);
          return action.payload;
        }
        responseHandler(response);
        dispatch(authService.logout());
        dispatch(alerts.actions.bad("Unable to retreive profile data"));
      })
      .catch(error => {
        dispatch(authService.logout());
        dispatch(alerts.actions.bad("Unable to retreive profile data"));
        responseHandler(error);
      });
  };
}

function getUserById(id) {
  switch (id) {
    case 1:
      return getCurrentUser();

    case 2:
      return new UserModel({
        id: 2,
        firstname: "Gavin",
        lastname: "Brooks"
      });
    case 3:
      return new UserModel({
        id: 3,
        firstname: "Perry",
        lastname: "Charrington"
      });
    case 4:
      return new UserModel({
        id: 4,
        firstname: "Tom",
        lastname: "Elliot"
      });
    case 5:
      return new UserModel({
        id: 5,
        firstname: "Brent",
        lastname: "Mayger"
      });
    default:
      return getCurrentUser();
  }
}

export const register = data => {
  return async dispatch => {
    dispatch(user.actions.registerRequest(user));

    const {firstname, lastname, email, password} = data;

    if (!firstname || !lastname || !email || !password) {
      return dispatch(alerts.actions.bad("All fields must be complete"));
    }

    await axios
      .post(`${process.env.REACT_APP_API_URL}/users/create`, data)
      .then(response => {
        if (response.status === 201) {
          dispatch(user.actions.registerSuccess(data));
          dispatch(
            alerts.actions.good("Account created! Go ahead and login", {
              toastId: "@app/user/register/success"
            })
          );
          history.push("/login");
        } else if (response.data.error) {
          dispatch(user.actions.registerFailure(data, response.data.error));
          dispatch(
            alerts.actions.bad(response.data.error, {
              toastId: "@app/user/register/rejected"
            })
          );
        } else {
          responseHandler(response);
          dispatch(
            user.actions.registerFailure(data, "An unknown error occurred")
          );
        }
      })
      .catch(error => {
        responseHandler(error);
        dispatch(user.actions.registerFailure(data, error.toString()));
      });
  };
};

const requestRecoverAccount = email => {
  return async dispatch => {
    dispatch(user.actions.recoverRequest(email));

    if (!email) {
      return dispatch(
        alerts.actions.bad("I've no idea who I'm supposed to be helping")
      );
    }

    await axios
      .post(`${process.env.REACT_APP_API_URL}/users/recover`, {email})
      .then(response => {
        if (response.status === 201) {
          dispatch(user.actions.recoverSuccess(email));
          dispatch(
            alerts.actions.good("Check your email, friend", {
              toastId: "@app/user/recover/success"
            })
          );
          history.push("/login");
        } else if (response.data.error) {
          dispatch(user.actions.recoverFailure(email, response.data.error));
          dispatch(
            alerts.actions.bad(response.data.error, {
              toastId: "@app/user/recover/rejected"
            })
          );
        } else {
          responseHandler(response);
          dispatch(
            user.actions.recoverFailure(email, "An unknown error occurred")
          );
        }
      })
      .catch(error => {
        responseHandler(error);
        dispatch(user.actions.recoverFailure(email, error.toString()));
      });
  };
};

const completeRecoverAccount = (token, password) => {
  return async dispatch => {
    dispatch(user.actions.completeRecoverRequest());

    if (!password) {
      return dispatch(alerts.actions.bad("I'm gonna need a new password chum"));
    }

    await axios
      .post(`${process.env.REACT_APP_API_URL}/users/complete_recover`, {
        token,
        password
      })
      .then(response => {
        if (response.status === 202) {
          dispatch(user.actions.completeRecoverSuccess());
          dispatch(
            alerts.actions.good(
              "Your password has been updated! Try logging in",
              {
                toastId: "@app/user/completeRecover/success"
              }
            )
          );
          history.push("/login");
        } else if (response.data.error) {
          dispatch(user.actions.completeRecoverFailure(response.data.error));
          dispatch(
            alerts.actions.bad(response.data.error, {
              toastId: "@app/user/completeRecover/failure"
            })
          );
        } else {
          responseHandler(response);
          dispatch(
            user.actions.completeRecoverFailure("An unknown error occurred")
          );
        }
      })
      .catch(error => {
        responseHandler(error);
        dispatch(user.actions.completeRecoverFailure(error.toString()));
      });
  };
};

async function recoveryTokenIsValid(token) {
  let isValid = false;
  await axios
    .post(`${process.env.REACT_APP_API_URL}/users/complete_recover`, {token})
    .then(response => {
      if (response.data.isValid === true) {
        isValid = true;
      } else {
        history.push("/login");
        responseHandler(response);
      }
    })
    .catch(error => {
      responseHandler(error);
    });

  return isValid;
}

export const userService = {
  getCurrentUser,
  getUserById,
  register,
  requestRecoverAccount,
  recoveryTokenIsValid,
  completeRecoverAccount,
  getUserProfile,
  userHasClubs,
  userHasLeagues,
  userHasPlayers
};
