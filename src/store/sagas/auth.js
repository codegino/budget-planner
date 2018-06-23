import { put, call } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';

import { authSignupSucceed, authSignupFail, authLoginSucceed, authLoginFail, authAutoLoginFail, authLogoutSucceed, authLogoutFail } from '../actions/auth';
import { clearExpenses } from '../actions/expenses';
import { clearBudgetPlan } from '../actions/budgetPlan';
import { onLoadingEnd, onLoadingStart } from '../actions/ui';
import startExpensesTabs from '../../screens/tracker/startExpensesTabs';
import firebase from '../../services/firebase';


export function* authSignupSaga(action) {
  try {
    yield put(onLoadingStart());
    const { email, password } = action.authData;

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(() => {
        put(onLoadingEnd());
      });

    const currentUser = yield firebase.auth().currentUser;
    yield put(authSignupSucceed({
      token: currentUser.qa,
      userId: currentUser.uid,
    }));

    yield call(Navigation.startSingleScreenApp, {
      screen: {
        screen: 'expenses.AuthScreen',
        title: 'Login',
      },
    });
    yield put(onLoadingEnd());
  } catch (error) {
    yield put(authSignupFail());
    yield put(onLoadingEnd());
  }
}

export function* authLoginSaga(action) {
  try {
    yield put(onLoadingStart());
    yield firebase.auth()
      .signInWithEmailAndPassword(action.authData.email, action.authData.password);

    const authRef = yield call([firebase, firebase.auth]);
    const currentUser = yield authRef.currentUser;

    yield put(authLoginSucceed({
      token: currentUser.qa,
      userId: currentUser.uid,
    }));
    yield startExpensesTabs();
    yield put(onLoadingEnd());
  } catch (error) {
    yield put(authLoginFail());
    yield put(onLoadingEnd());
  }
}

export function* authAutoLoginSaga(action) {
  yield put(onLoadingStart());
  if (action.user) {
    yield put(authLoginSucceed({
      token: action.user.qa,
      userId: action.user.uid,
    }));
    yield call(startExpensesTabs);
  } else {
    yield put(authAutoLoginFail());
    yield call(Navigation.startSingleScreenApp, {
      screen: {
        screen: 'expenses.AuthScreen',
        title: 'Authentication',
      },
    });
  }
  yield put(onLoadingEnd());
}

export function* authLogoutSaga() {
  yield put(onLoadingStart());
  try {
    const authRef = yield call([firebase, firebase.auth]);
    yield call([authRef, authRef.signOut]);
    yield put(authLogoutSucceed());
    yield put(clearExpenses());
    yield put(clearBudgetPlan());
  } catch (error) {
    yield put(authLogoutFail());
  }
  yield put(onLoadingEnd());
}
