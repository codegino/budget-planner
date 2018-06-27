import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import saga from 'redux-saga';
import { applyMiddleware } from 'redux';

import BudgetPlan from 'containers/budget/BudgetPlan';

const middlewares = [saga];

const state = {
  expenses: {
    expenses: [],
  },
};

it('will render', () => {
  const initialState = state;
  const mockStore = configureStore(initialState);

  const store = mockStore(initialState, applyMiddleware(middlewares));

  const budget = {
    category: 'test',
    budget: 100,
    expenses: 10,
    date: 'Jun-2010',
  };

  const budgetPlan = renderer.create(<BudgetPlan store={store} budgetPlan={budget} />);

  expect(budgetPlan.toJSON()).toMatchSnapshot();
});
