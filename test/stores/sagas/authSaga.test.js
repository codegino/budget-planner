import { authLogoutSaga, authLoginSaga, authSignupSaga } from 'store/sagas/auth';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { signInWithEmailAndPassword, signOut, getCurrentUser, createUserWithEmailAndPassword } from 'services/firebaseAuth';
import * as Navigation from 'react-native-navigation';


it('will pass when provided with password', () => {
  const authData = {
    email: 'test@test.com',
    password: 'password',
  };

  return expectSaga(authLoginSaga, { authData })
    .provide([
      [call(signInWithEmailAndPassword, authData.email, authData.password)],
      [call(getCurrentUser), { qa: 'token', uid: 'userId' }],
    ])
    .put({
      type: 'ON_LOADING_START',
    })
    .put({
      type: 'AUTH_LOGIN_SUCCESS',
      token: 'token',
      userId: 'userId',
    })
    .put({
      type: 'ON_LOADING_END',
    })
    .run();
});

it('clear expenses and budget plan during logout', () => {
  const authData = {
    email: 'test@test.com',
    password: 'password',
  };

  return expectSaga(authLogoutSaga, authData)
    .provide([
      [call(signOut)],
    ])
    .put({
      type: 'ON_LOADING_START',
    })
    .put({
      type: 'AUTH_LOGOUT_SUCCESS',
    })
    .put({
      type: 'CLEAR_EXPENSES',
    })
    .put({
      type: 'CLEAR_BUDGET_PLAN',
    })
    .put({
      type: 'ON_LOADING_END',
    })
    .run();
});

it('will signup when provided with password', () => {
  const authData = {
    email: 'test@test.com',
    password: 'password',
  };

  Navigation.Navigation.startSingleScreenApp = jest.fn(() => {});

  expectSaga(authSignupSaga, { authData })
    .provide([
      [call(createUserWithEmailAndPassword, authData.email, authData.password)],
      [call(getCurrentUser), { qa: 'token', uid: 'userId' }],
    ])
    .put({
      type: 'ON_LOADING_START',
    })
    .put({
      type: 'AUTH_SIGNUP_SUCCESS',
      authData: {
        token: 'token',
        userId: 'userId',
      },
    })
    .put({
      type: 'ON_LOADING_END',
    })
    .run();

  expect(Navigation.Navigation.startSingleScreenApp).toHaveBeenCalledWith({
    screen: {
      screen: 'expenses.AuthScreen',
      title: 'Login',
    },
  });
});
