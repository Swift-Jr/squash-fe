import inviteService from "./";

const initialState = {
  list: [],
  listUpdated: false,
  request: {
    submitted: false,
    created: false,
    invites: [],
    club_id: null,
    error: false
  },
  modal: {
    open: false
  }
};

export const invitesReducer = (state = initialState, action = null) => {
  const {type, payload} = action;
  const {types} = inviteService;

  switch (type) {
    case types.OPEN_INVITE:
      return {
        ...state,
        modal: {
          open: true
        }
      };
    case types.CREATE_INVITE_REQUEST:
      return {
        ...state,
        request: {
          submitted: true,
          created: false,
          invites: payload.invites,
          club_id: payload.club_id
        }
      };
    case types.CREATE_INVITE_SUCCESS:
      return {
        list: state.list.concat(payload.invites),
        request: {
          submitted: false,
          created: true,
          invites: payload.invites,
          club_id: payload.club_id
        },
        modal: {
          open: false
        }
      };
    case types.CREATE_INVITE_FAILURE:
      return {
        ...state,
        request: {
          ...state.request,
          submitted: false,
          created: false,
          error: payload.error
        }
      };
    case types.FETCH_INVITES_SUCCESS:
      return {
        ...state,
        list: state.list.concat(payload.invites),
        listUpdated: new Date()
      };
    default:
      break;
  }

  return state;
};
