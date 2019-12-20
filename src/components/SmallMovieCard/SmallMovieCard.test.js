import React from 'react';
import { shallow } from 'enzyme';
import SmallMovieCard from './SmallMovieCard';

describe("SmallMovieCard", () => {
  let card, mockProps, instance;

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

    instance = card.instance()
  });

  it("should match snapshot with all data passed in correctly", () => {
    const cardWithDeleteButton = shallow(
      <SmallMovieCard { ...mockProps } deleteButton={true} />
    )
    expect(cardWithDeleteButton).toMatchSnapshot();
  });

  it("should match snapshot with all data passed in correctly except delete button", () => {
    expect(card).toMatchSnapshot();
  });

  it("should match snapshot with redirect router if redirect state is true", () => {
    card.setState({isRedirected: true});
    expect(card).toMatchSnapshot();
  });

  it("should call redirect after title was clicked", () => {
    const spy = jest.spyOn(instance, 'redirect').mockImplementation(() => {});
    instance.forceUpdate();

    card.find('.title').simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it("should change isRedirected state to true when redirect is called", () => {
    expect(card.state('isRedirected')).toEqual(false);

    instance.redirect();

    expect(card.state('isRedirected')).toEqual(true);
  });
});
