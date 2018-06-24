import React from 'react';
import ProgressBar from 'components/budget/ProgressBar';
import renderer from 'react-test-renderer';

describe('renders with color success progress bar when percentage is below 50', () => {
  it('will have an 0% at minimum', () => {
    const greenProgressBarMin = <ProgressBar numerator={0} denominator={100} />;
    expect(renderer.create(greenProgressBarMin).toJSON()).toMatchSnapshot();
  });

  it('will have an 49% at maximum', () => {
    const greenProgressBarMax = <ProgressBar numerator={49} denominator={100} />;
    expect(renderer.create(greenProgressBarMax).toJSON()).toMatchSnapshot();
  });
});


describe('renders with color notify progress bar when percentage is 50-69', () => {
  it('will change color at 50%', () => {
    const greenProgressBarMin = <ProgressBar numerator={50} denominator={100} />;
    expect(renderer.create(greenProgressBarMin).toJSON()).toMatchSnapshot();
  });

  it('will have an 69% at maximum', () => {
    const greenProgressBarMax = <ProgressBar numerator={69} denominator={100} />;
    expect(renderer.create(greenProgressBarMax).toJSON()).toMatchSnapshot();
  });
});

describe('renders with color warning progress bar when percentage is 70-89', () => {
  it('will change color at 70%', () => {
    const greenProgressBarMin = <ProgressBar numerator={70} denominator={100} />;
    expect(renderer.create(greenProgressBarMin).toJSON()).toMatchSnapshot();
  });

  it('will have an 89% at maximum', () => {
    const greenProgressBarMax = <ProgressBar numerator={89} denominator={100} />;
    expect(renderer.create(greenProgressBarMax).toJSON()).toMatchSnapshot();
  });
});

describe('renders with color danger progress bar when percentage 90 and above', () => {
  it('will change color at 90%', () => {
    const greenProgressBarMin = <ProgressBar numerator={90} denominator={100} />;
    expect(renderer.create(greenProgressBarMin).toJSON()).toMatchSnapshot();
  });

  it('will still be color danger after exceeding', () => {
    const greenProgressBarMax = <ProgressBar numerator={1000} denominator={100} />;
    expect(renderer.create(greenProgressBarMax).toJSON()).toMatchSnapshot();
  });
});
