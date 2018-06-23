import { takeEvery, takeLatest } from 'redux-saga/effects';
import { authSignupSaga, authLoginSaga, authAutoLoginSaga, authLogoutSaga } from './auth';
import { fetchExpensesSaga, addExpensesSaga, deleteExpensesSaga, updateExpensesSaga } from './expenses';
import { fetchBudgetPlanSaga, addBudgetPlanSaga, deleteBudgetPlanSaga, updateBudgetPlanSaga } from './budgetPlan';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
  yield takeLatest(actionTypes.AUTH_SIGNUP_START, authSignupSaga);
  yield takeLatest(actionTypes.AUTH_LOGIN_START, authLoginSaga);
  yield takeLatest(actionTypes.AUTH_AUTO_LOGIN_START, authAutoLoginSaga);
  yield takeLatest(actionTypes.AUTH_LOGOUT_START, authLogoutSaga);
}

export function* watchExpenses() {
  yield takeEvery(actionTypes.FETCH_EXPENSES_START, fetchExpensesSaga);
  yield takeLatest(actionTypes.ADD_EXPENSES_START, addExpensesSaga);
  yield takeLatest(actionTypes.DELETE_EXPENSES_START, deleteExpensesSaga);
  yield takeLatest(actionTypes.UPDATE_EXPENSES_START, updateExpensesSaga);
}

export function* watchBudgetPlan() {
  yield takeEvery(actionTypes.FETCH_BUDGET_PLAN_START, fetchBudgetPlanSaga);
  yield takeLatest(actionTypes.ADD_BUDGET_PLAN_START, addBudgetPlanSaga);
  yield takeLatest(actionTypes.DELETE_BUDGET_PLAN_START, deleteBudgetPlanSaga);
  yield takeLatest(actionTypes.UPDATE_BUDGET_PLAN_START, updateBudgetPlanSaga);
}
