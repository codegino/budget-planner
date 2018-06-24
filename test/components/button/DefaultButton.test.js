import React from 'react';
import DefaultButton from 'components/button/DefaultButton';
import renderer from 'react-test-renderer';

describe('Default Button', () => {
  it('will have have a text of hello', () => {
    const button = <DefaultButton title="Hello" />;
    expect(renderer.create(button).toJSON()).toMatchSnapshot();
  });

  it('will have background color of red', () => {
    const button = <DefaultButton title="Hello" style={{ backgroundColor: 'red' }} />;
    expect(renderer.create(button).toJSON()).toMatchSnapshot();
  });
});
