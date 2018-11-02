import club from "./";
import userService from "../user";

const initialState = {
  selectedClub: null,
  list: [],
  create: {
    submitted: false,
    created: false,
    club: null,
    error: null
  }
};

export const clubReducer = (state = initialState, action = null) => {
  const {type, payload} = action;
  const {types} = club;

  switch (type) {
    case types.CREATE_CLUB_REQUEST:
      return {
        ...state,
        create: {
          submitted: true,
          created: false
        }
      };
    case types.CREATE_CLUB_SUCCESS:
      return {
        ...state,
        create: {
          submitted: false,
          created: true,
          club: payload.club
        },
        list: state.list.concat([payload.club])
      };
    case types.CREATE_CLUB_FAILURE:
      return {
        ...state,
        create: {
          submitted: false,
          created: false,
          club: payload.name,
          error: payload.error
        }
      };
    case userService.types.RETREIVE_PROFILE:
      return {
        ...state,
        list: payload.clubs,
        selectedClub: payload.clubs[0]
      };
    default:
      break;
  }

  return state;
};
