import { SET_USER_ID, CLEAR_USER_ID, SET_USER_DETAILS, CLEAR_USER_DETAILS } from '../actions/userActions';

const initialState = {
  userId: null,
  userDetails: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case CLEAR_USER_ID:
      return {
        ...state,
        userId: null,
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case CLEAR_USER_DETAILS:
      return {
        ...state,
        userDetails: null,
      };
    default:
      return state;
  }
};

export default userReducer;
