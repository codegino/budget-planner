import { put, call } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';

import { onLoadingEnd, onLoadingStart } from '../actions/ui';
import {
  fetchExpensesSuccess, fetchExpensesFail, addExpensesSuccess,
  deleteExpensesSuccess, deleteExpensesfail,
  updateExpensesSuccess, updateExpensesfail,
} from '../actions/expenses';
import firebase from '../../services/firebase';

export function* fetchExpensesSaga() {
  yield put(onLoadingStart());
  try {
    const authRef = yield call([firebase, firebase.auth]);
    const userId = yield authRef.currentUser.uid;

    const databaseRef = yield call([firebase, firebase.database]);
    const itemsRef = yield call([databaseRef, databaseRef.ref], `/users/${userId}/items`);
    const expensesRefVal = yield itemsRef.once('value').then(snapshot => snapshot.val());

    const expenses = Object.keys(expensesRefVal).map(id => ({
      ...expensesRefVal[id],
      id,
    }));

    yield put(fetchExpensesSuccess(expenses));
  } catch (error) {
    yield put(fetchExpensesFail());
  }
  yield put(onLoadingEnd());
}

export function* addExpensesSaga(action) {
  yield put(onLoadingStart());
  const userId = yield firebase.auth().currentUser.uid;

  const addItemRef = firebase.database().ref(`users/${userId}/items`).push({
    ...action.item,
  });

  const item = {
    id: addItemRef.key,
    ...action.item,
  };

  yield put(addExpensesSuccess(item));
  yield Navigation.dismissModal({
    animationType: 'slide-down',
  });

  yield put(onLoadingEnd());
}

export function* deleteExpensesSaga(action) {
  yield put(onLoadingStart());
  const userId = yield firebase.auth().currentUser.uid;

  try {
    yield firebase.database().ref(`users/${userId}/items/${action.item.id}`).remove();
    yield put(deleteExpensesSuccess(action.item));
  } catch (error) {
    yield put(deleteExpensesfail());
  }

  yield put(onLoadingEnd());
}

export function* updateExpensesSaga(action) {
  yield put(onLoadingStart());
  const userId = yield firebase.auth().currentUser.uid;

  try {
    const updates = {};
    updates[`users/${userId}/items/${action.item.id}`] = {
      name: action.item.name,
      price: action.item.price,
      date: action.item.date,
      category: action.item.category,
    };
    yield firebase.database().ref().update(updates);
    yield put(updateExpensesSuccess(action.item));
    yield Navigation.dismissModal({
      animationType: 'slide-down',
    });
  } catch (error) {
    yield put(updateExpensesfail());
  }

  yield put(onLoadingEnd());
}
