import _ from 'lodash';

import {
  FETCH_EXPENSES_SUCCESS, ADD_EXPENSES_SUCCESS, DELETE_EXPENSES_SUCCESS,
  UPDATE_EXPENSES_SUCCESS,
  UPDATE_MONTH_VIEW,
  CLEAR_EXPENSES,
} from '../actions/expenses';

const initialState = {
  expenses: [],
  selectedMonth: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: action.expenses,
      };
    case ADD_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.concat(action.item),
      };
    case DELETE_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: _.filter(state.expenses, o => o.id !== action.id),
      };
    case UPDATE_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: _.map(state.expenses, o => (o.id === action.item.id ? action.item : o)),
      };
    case UPDATE_MONTH_VIEW:
      return {
        ...state,
        selectedMonth: action.month,
      };
    case CLEAR_EXPENSES:
      return {
        ...state,
        expenses: [],
        selectedMonth: null,
      };
    default:
      return state;
  }
};

export default reducer;
