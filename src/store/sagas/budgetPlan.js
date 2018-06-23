import { put, call } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';

import { onLoadingEnd, onLoadingStart } from '../actions/ui';
import {
  fetchBudgetPlanSuccess, fetchBudgetPlanFail, addBudgetPlanSuccess,
  deleteBudgetPlanSuccess, deleteBudgetPlanFail,
  updateBudgetPlanSuccess, updateBudgetPlanFail,
} from '../actions/budgetPlan';
import firebase from '../../services/firebase';

export function* fetchBudgetPlanSaga() {
  yield put(onLoadingStart());
  try {
    const authRef = yield call([firebase, firebase.auth]);
    const userId = yield authRef.currentUser.uid;

    const databaseRef = yield call([firebase, firebase.database]);
    const budgetPlansRef = yield call([databaseRef, databaseRef.ref], `/users/${userId}/budgetPlans`);
    const budgetPlanRefVal = yield budgetPlansRef.once('value').then(snapshot => snapshot.val());

    const budgetPlans = Object.keys(budgetPlanRefVal).map(id => ({
      ...budgetPlanRefVal[id],
      id,
    }));

    yield put(fetchBudgetPlanSuccess(budgetPlans));
  } catch (error) {
    yield put(fetchBudgetPlanFail());
  }
  yield put(onLoadingEnd());
}

export function* addBudgetPlanSaga(action) {
  yield put(onLoadingStart());
  const userId = yield firebase.auth().currentUser.uid;

  const addItemRef = firebase.database().ref(`users/${userId}/budgetPlans`).push({
    ...action.budgetPlan,
  });

  const budgetPlan = {
    id: addItemRef.key,
    ...action.budgetPlan,
  };

  yield put(addBudgetPlanSuccess(budgetPlan));
  yield Navigation.dismissModal({
    animationType: 'slide-down',
  });

  yield put(onLoadingEnd());
}

export function* deleteBudgetPlanSaga(action) {
  yield put(onLoadingStart());
  const userId = yield firebase.auth().currentUser.uid;

  try {
    yield firebase.database().ref(`users/${userId}/budgetPlans/${action.budgetPlan.id}`).remove();
    yield put(deleteBudgetPlanSuccess(action.budgetPlan));
  } catch (error) {
    yield put(deleteBudgetPlanFail());
  }

  yield put(onLoadingEnd());
}

export function* updateBudgetPlanSaga(action) {
  yield put(onLoadingStart());
  const userId = yield firebase.auth().currentUser.uid;

  try {
    const updates = {};
    updates[`users/${userId}/budgetPlans/${action.budgetPlan.id}`] = {
      category: action.budgetPlan.category,
      budget: action.budgetPlan.budget,
      expenses: action.budgetPlan.expenses,
      date: action.budgetPlan.date,
    };
    yield firebase.database().ref().update(updates);
    yield put(updateBudgetPlanSuccess(action.budgetPlan));
    yield Navigation.dismissModal({
      animationType: 'slide-down',
    });
  } catch (error) {
    yield put(updateBudgetPlanFail());
  }

  yield put(onLoadingEnd());
}
