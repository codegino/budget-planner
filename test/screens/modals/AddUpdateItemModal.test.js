import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import AddUpdateItemModal from 'screens/modals/AddUpdateItemModal';

it('will render the default view for adding new Item', () => {
  const getState = {
    budgetPlan: {
      budgetPlans: [],
    },
  };
  const mockStore = configureStore(getState);
  const store = mockStore(getState);

  const addUpdateItemModal = renderer.create(<AddUpdateItemModal store={store} />);

  expect(addUpdateItemModal.toJSON()).toMatchSnapshot();
});
