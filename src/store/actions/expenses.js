export const FETCH_EXPENSES_START = 'FETCH_EXPENSES_START';
export const FETCH_EXPENSES_SUCCESS = 'FETCH_EXPENSES_SUCCESS';
export const FETCH_EXPENSES_FAIL = 'FETCH_EXPENSES_FAIL';

export const ADD_EXPENSES_START = 'ADD_EXPENSES_START';
export const ADD_EXPENSES_SUCCESS = 'ADD_EXPENSES_SUCCESS';
export const ADD_EXPENSES_FAIL = 'ADD_EXPENSES_FAIL';

export const DELETE_EXPENSES_START = 'DELETE_EXPENSES_START';
export const DELETE_EXPENSES_SUCCESS = 'DELETE_EXPENSES_SUCESS';
export const DELETE_EXPENSES_FAIL = 'DELETE_EXPENSES_FAIL';

export const UPDATE_EXPENSES_START = 'UPDATE_EXPENSES_START';
export const UPDATE_EXPENSES_SUCCESS = 'UPDATE_EXPENSES_SUCESS';
export const UPDATE_EXPENSES_FAIL = 'UPDATE_EXPENSES_FAIL';

export const UPDATE_MONTH_VIEW = 'UPDATE_MONTH_VIEW';
export const CLEAR_EXPENSES = 'CLEAR_EXPENSES';

type ExpenseItem = {
  name: string,
  price: number,
  date: string,
  category: string,
};

export const fetchExpenses = () => ({
  type: FETCH_EXPENSES_START,
});

export const fetchExpensesSuccess = (expenses: Array) => ({
  type: FETCH_EXPENSES_SUCCESS,
  expenses,
});

export const fetchExpensesFail = () => ({
  type: FETCH_EXPENSES_FAIL,
});

export const addExpenses = (item: ExpenseItem) => ({
  type: ADD_EXPENSES_START,
  item,
});

export const addExpensesSuccess = (item: ExpenseItem) => ({
  type: ADD_EXPENSES_SUCCESS,
  item,
});

export const addExpensesfail = () => ({
  type: ADD_EXPENSES_FAIL,
});

export const deleteExpenses = (item: ExpenseItem) => ({
  type: DELETE_EXPENSES_START,
  item,
});

export const deleteExpensesfail = () => ({
  type: DELETE_EXPENSES_FAIL,
});

export const deleteExpensesSuccess = (item: ExpenseItem) => ({
  type: DELETE_EXPENSES_SUCCESS,
  id: item.id,
});

export const updateExpenses = (item: ExpenseItem) => ({
  type: UPDATE_EXPENSES_START,
  item,
});

export const updateExpensesfail = () => ({
  type: UPDATE_EXPENSES_FAIL,
});

export const updateExpensesSuccess = (item: ExpenseItem) => ({
  type: UPDATE_EXPENSES_SUCCESS,
  item,
});

export const updateMonth = month => ({
  type: UPDATE_MONTH_VIEW,
  month,
});

export const clearExpenses = () => ({
  type: CLEAR_EXPENSES,
});
