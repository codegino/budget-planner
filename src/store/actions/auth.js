export const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS';
export const AUTH_SIGNUP_START = 'AUTH_SIGNUP_START';
export const AUTH_SIGNUP_FAIL = 'AUTH_SIGNUP_FAIL';

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';

export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_START = 'AUTH_LOGOUT_START';
export const AUTH_LOGOUT_FAIL = 'AUTH_LOGOUT_FAIL';

export const AUTH_AUTO_LOGIN_START = 'AUTH_AUTO_LOGIN_START';
export const AUTH_AUTO_LOGIN_FAIL = 'AUTH_AUTO_LOGIN_FAIL';

export const authSignup = authData => ({
  type: AUTH_SIGNUP_START,
  authData,
});

export const authSignupSucceed = authData => ({
  type: AUTH_SIGNUP_SUCCESS,
  authData,
});

export const authSignupFail = () => ({
  type: AUTH_SIGNUP_FAIL,
});

export const authLogin = authData => ({
  type: AUTH_LOGIN_START,
  authData,
});

export const authLoginSucceed = authData => ({
  type: AUTH_LOGIN_SUCCESS,
  token: authData.token,
  userId: authData.userId,
});

export const authLoginFail = () => ({
  type: AUTH_LOGIN_FAIL,
});

export const authAutoLoginStart = user => ({
  type: AUTH_AUTO_LOGIN_START,
  user,
});

export const authAutoLoginFail = () => ({
  type: AUTH_AUTO_LOGIN_FAIL,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT_START,
});

export const authLogoutSucceed = () => ({
  type: AUTH_LOGOUT_SUCCESS,
});

export const authLogoutFail = () => ({
  type: AUTH_LOGOUT_FAIL,
});
