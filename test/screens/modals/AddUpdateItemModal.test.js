import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import AddUpdateItemModal from 'screens/modals/AddUpdateItemModal';

describe('Rendering of view', () => {
  const RealDate = Date;

  let store;
  beforeAll(() => {
    const constantDate = new Date('May 02 2018');
    // eslint-disable-next-line
    Date = class extends Date {
      constructor() {
        super();
        return constantDate;
      }
    };
  });

  afterAll(() => {
    // eslint-disable-next-line
    Date = RealDate;
  });

  beforeEach(() => {
    const getState = {
      budgetPlan: {
        budgetPlans: [],
      },
    };
    const mockStore = configureStore(getState);
    store = mockStore(getState);
    jest.mock('DatePickerIOS', () => 'DatePickerIOS');
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
