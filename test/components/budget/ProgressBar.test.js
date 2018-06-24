import React from 'react';
import ProgressBar from 'components/budget/ProgressBar';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<ProgressBar />).toJSON();
  expect(rendered).toBeTruthy();

  expect(rendered).toMatchSnapshot();
});

