import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { addBudgetPlan, ADD_BUDGET_PLAN_START, updateBudgetPlan, UPDATE_BUDGET_PLAN_START } from 'store/actions/budgetPlan';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureMockStore([sagaMiddleware]);

describe('should have a payload when action is called', () => {
  let budgetPlan;
  let getState;
  let store;

  beforeEach(() => {
    budgetPlan = {
      category: 'test',
      budget: 100,
      expenses: 10,
      date: 'Jun-2010',
    };
    getState = {};
    store = mockStore(getState);
  });

  it('should dispatch ADD_BUDGET_PLAN_START when addBudgetPlan is called', () => {
    store.dispatch(addBudgetPlan(budgetPlan));

    const actions = store.getActions();
    const expectedPayload = { type: ADD_BUDGET_PLAN_START, budgetPlan };
    expect(actions).toEqual([expectedPayload]);
  });

  it('should dispatch ADD_BUDGET_PLAN_START when updateBudgetPlan is called', () => {
    store.dispatch(updateBudgetPlan(budgetPlan));

    const actions = store.getActions();
    const expectedPayload = { type: UPDATE_BUDGET_PLAN_START, budgetPlan };
    expect(actions).toEqual([expectedPayload]);
  });
});
