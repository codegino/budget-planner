import React from 'react';
import Login from 'screens/auth/Login';
import configureStore from 'redux-mock-store';
import ShallowRenderer from 'react-test-renderer/shallow';
import { authLogin } from 'store/actions/auth';
import saga from 'redux-saga';
import { applyMiddleware } from 'redux';

const middlewares = [saga];

it('Matches snapshot', () => {
  const initialState = { output: 100 };
  const mockStore = configureStore();
  const renderer = new ShallowRenderer();

  const store = mockStore(initialState, applyMiddleware(middlewares));
  const container = renderer.render(<Login store={store} />);

  store.dispatch(authLogin());
  // it('+++ render the connected(SMART) component', () => {
  //   expect(container.length).toEqual(1);
  // });

  // it('+++ check Prop matches with initialState', () => {
  //   expect(container.prop('output')).toEqual(initialState.output)
  // });

  expect(container).toMatchSnapshot();
});
