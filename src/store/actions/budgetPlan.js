export const FETCH_BUDGET_PLAN_START = 'FETCH_BUDGET_PLAN_START';
export const FETCH_BUDGET_PLAN_SUCCESS = 'FETCH_BUDGET_PLAN_SUCCESS';
export const FETCH_BUDGET_PLAN_FAIL = 'FETCH_BUDGET_PLAN_FAIL';

export const ADD_BUDGET_PLAN_START = 'ADD_BUDGET_PLAN_START';
export const ADD_BUDGET_PLAN_SUCCESS = 'ADD_BUDGET_PLAN_SUCCESS';
export const ADD_BUDGET_PLAN_FAIL = 'ADD_BUDGET_PLAN_FAIL';

export const DELETE_BUDGET_PLAN_START = 'DELETE_BUDGET_PLAN_START';
export const DELETE_BUDGET_PLAN_SUCCESS = 'DELETE_ENVELOPE_SUCESS';
export const DELETE_BUDGET_PLAN_FAIL = 'DELETE_BUDGET_PLAN_FAIL';

export const UPDATE_BUDGET_PLAN_START = 'UPDATE_BUDGET_PLAN_START';
export const UPDATE_BUDGET_PLAN_SUCCESS = 'UPDATE_ENVELOPE_SUCESS';
export const UPDATE_BUDGET_PLAN_FAIL = 'UPDATE_BUDGET_PLAN_FAIL';

export const CLEAR_BUDGET_PLAN = 'CLEAR_BUDGET_PLAN';

type BudgetPlan = {
  category: string,
  budget: number,
  expenses: number,
  date: string,
};

export const fetchBudgetPlan = () => ({
  type: FETCH_BUDGET_PLAN_START,
});

export const fetchBudgetPlanSuccess = (budgetPlans: Array) => ({
  type: FETCH_BUDGET_PLAN_SUCCESS,
  budgetPlans,
});

export const fetchBudgetPlanFail = () => ({
  type: FETCH_BUDGET_PLAN_FAIL,
});

export const addBudgetPlan = (budgetPlan: BudgetPlan) => ({
  type: ADD_BUDGET_PLAN_START,
  budgetPlan,
});

export const addBudgetPlanSuccess = (budgetPlan: BudgetPlan) => ({
  type: ADD_BUDGET_PLAN_SUCCESS,
  budgetPlan,
});

export const addBudgetPlanFail = () => ({
  type: ADD_BUDGET_PLAN_FAIL,
});

export const deleteBudgetPlan = (budgetPlan: BudgetPlan) => ({
  type: DELETE_BUDGET_PLAN_START,
  budgetPlan,
});

export const deleteBudgetPlanFail = () => ({
  type: DELETE_BUDGET_PLAN_FAIL,
});

export const deleteBudgetPlanSuccess = (budgetPlan: BudgetPlan) => ({
  type: DELETE_BUDGET_PLAN_SUCCESS,
  id: budgetPlan.id,
});

export const updateBudgetPlan = (budgetPlan: BudgetPlan) => ({
  type: UPDATE_BUDGET_PLAN_START,
  budgetPlan,
});

export const updateBudgetPlanFail = () => ({
  type: UPDATE_BUDGET_PLAN_FAIL,
});

export const updateBudgetPlanSuccess = (budgetPlan: BudgetPlan) => ({
  type: UPDATE_BUDGET_PLAN_SUCCESS,
  budgetPlan,
});

export const clearBudgetPlan = () => ({
  type: CLEAR_BUDGET_PLAN,
});
