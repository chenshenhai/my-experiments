import App from '../src/app';

import React from 'react';
import renderer from 'react-test-renderer';

test('Test React ', () => {
  const component = renderer.create(
    <App beginNum={100} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});