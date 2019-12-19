import React from 'react';
import { shallow } from 'enzyme';
import SmallMovieCard from './SmallMovieCard';

describe("SmallMovieCard", () => {
  let card, mockProps;

  beforeEach(() => {
    mockProps = {
      id: 1,
      img: 'https://some.url/img.jpg',
      title: 'Jumanji: The Next Level',
      rate: 4
    }

    card = shallow(
      <SmallMovieCard { ...mockProps } />
    )
  });

  it("should match snapshot with all data passed in correctly", () => {
    expect(card).toMatchSnapshot();
  });

  it("should match snapshot with redirect router if redirect state is true", () => {
    card.setState({isRedirected: true});
    expect(card).toMatchSnapshot();
  });

  it("should change redirect state to true after click on card", () => {
    expect(card.state('isRedirected')).toEqual(false);

    card.find('section').simulate('click');

    expect(card.state('isRedirected')).toEqual(true);
  });
});
