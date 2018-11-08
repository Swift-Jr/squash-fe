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
  },
  update: {
    submitted: false,
    updated: false,
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
    case types.UPDATE_CLUB_FAILURE:
      return {
        ...state,
        updated: {
          submitted: false,
          updated: false,
          club: payload.name,
          error: payload.error
        }
      };
    case types.UPDATE_CLUB_REQUEST:
      return {
        ...state,
        update: {
          submitted: true,
          updated: false
        }
      };
    case types.UPDATE_CLUB_SUCCESS:
      let clubList = state.list.filter(club => club.id !== payload.club.id);
      return {
        ...state,
        update: {
          submitted: false,
          updated: true,
          club: payload.club
        },
        list: clubList.concat([payload.club])
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
