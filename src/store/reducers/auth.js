import { AUTH_SIGNUP_SUCCESS, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS } from '../actions/auth';

const initialState = {
  userId: null,
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default reducer;
