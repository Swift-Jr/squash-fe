import {alerts} from "../alerts";

const initialState = {messages: []};

export const alertReducer = (state = initialState, action = null) => {
  const {type, payload} = action;

  switch (type) {
    case alerts.types.GOOD_ALERT:
      return {
        messages: [
          ...state.messages,
          {
            style: alerts.types.GOOD_ALERT,
            message: payload.message,
            options: {
              ...payload.options
            }
          }
        ]
      };
    case alerts.types.BAD_ALERT:
      return {
        messages: [
          ...state.messages,
          {
            style: alerts.types.BAD_ALERT,
            message: payload.message,
            options: {
              ...payload.options
            }
          }
        ]
      };
    case alerts.types.CLEAR:
      return initialState;
    default:
      return state;
  }
};
