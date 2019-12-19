import React from 'react';
import { shallow } from 'enzyme';
import LoadingImage from './LoadingImage';

it("should match snapshot with all data passed in correctly", () => {
  const image = shallow(<LoadingImage />);
  expect(image).toMatchSnapshot();
});
