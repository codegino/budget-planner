import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import AddUpdateItemModal from 'screens/modals/AddUpdateItemModal';

describe('Rendering of view', () => {
  jest.mock('DatePickerIOS', () => 'DatePickerIOS');
  let store;
  beforeEach(() => {
    const getState = {
      budgetPlan: {
        budgetPlans: [],
      },
    };
    const mockStore = configureStore(getState);
    store = mockStore(getState);
    Date.now = jest.fn(() => 1482363367071);
  });

  it('will render the default view for adding new Item', () => {
    const wrapper = renderer.create(<AddUpdateItemModal store={store} />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('will render the default view for edditing Item', () => {
    const item = {
      name: 'test name',
      category: 'test category',
      price: 100,
      date: 'May-02-2018',
    };

    const wrapper = renderer.create(<AddUpdateItemModal store={store} mode="edit" item={item} />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
