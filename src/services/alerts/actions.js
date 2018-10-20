import axios from "axios";

import {alerts} from "../alerts";

const good = (message, options = {}) => ({
  type: alerts.types.GOOD_ALERT,
  payload: {
    message,
    options
  }
});

const bad = (message, options = {}) => ({
  type: alerts.types.BAD_ALERT,
  payload: {
    message,
    options
  }
});

const clear = message => ({
  type: alerts.types.CLEAR
});

export const alertActions = {
  good,
  bad,
  clear
};
