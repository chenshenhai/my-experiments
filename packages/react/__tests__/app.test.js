import React from 'react';
import renderer from 'react-test-renderer';
import {cleanup, fireEvent, render } from '@testing-library/react';
import App from './../src/app';

afterEach(cleanup);

describe('Test React app', () => {

  it('App render', () => {
    const component = renderer.create(
      <App beginNum={200}/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('App click', () => {
    const { queryByText } = render(
      <App beginNum={300}/>,
    );
    expect(queryByText(/Add/i)).toBeTruthy();
    fireEvent.click(queryByText(/Add/i));
    expect(queryByText(/count\:301/i)).toBeTruthy();
  });
})