import _ from 'lodash';

import {
  FETCH_BUDGET_PLAN_SUCCESS, ADD_BUDGET_PLAN_SUCCESS, DELETE_BUDGET_PLAN_SUCCESS,
  UPDATE_BUDGET_PLAN_SUCCESS,
  CLEAR_BUDGET_PLAN,
} from '../actions/budgetPlan';

const initialState = {
  budgetPlans: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUDGET_PLAN_SUCCESS:
      return {
        ...state,
        budgetPlans: action.budgetPlans,
      };
    case ADD_BUDGET_PLAN_SUCCESS:
      return {
        ...state,
        budgetPlans: state.budgetPlans.concat(action.budgetPlan),
      };
    case DELETE_BUDGET_PLAN_SUCCESS:
      return {
        ...state,
        budgetPlans: _.filter(state.budgetPlans, o => o.id !== action.id),
      };
    case UPDATE_BUDGET_PLAN_SUCCESS:
      return {
        ...state,
        budgetPlans: _.map(
          state.budgetPlans,
          o => (o.id === action.budgetPlan.id ? _.cloneDeep(action.budgetPlan) : o),
        ),
      };
    case CLEAR_BUDGET_PLAN:
      return {
        ...state,
        budgetPlans: [],
      };
    default:
      return state;
  }
};

export default reducer;
