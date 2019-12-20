import React from 'react';
import { RatingsPage, mapStateToProps } from './RatingsPage';
import { shallow } from 'enzyme';

describe("RatingsPage", () => {
  const mockMoviesData =
    [{
      id: 1,
      title: "Jumanji: The Next Level",
      poster_path: 'https://some.url/poster-image',
      backdrop_path: 'https://some.url/bg-image',
      release_date: '2019-12-04',
      overview: 'In Jumanji: The Next Level, the gang is back but the game has changed.',
      average_rating: 4
    }];

  const mockRatingsData =
    [{
      id: 1,
      user_id: 1,
      movie_id: 1,
      rating: 6,
      created_at: "someDate",
      updated_at: "someDate"
    }];

  const mockProps = {
    movies: mockMoviesData,
    ratings: mockRatingsData,
    login: true
  }

  describe("RatingsPage component", () => {
    let page, instance;

    beforeEach(() => {
      page = shallow(<RatingsPage {...mockProps}/>);
      instance = page.instance();
    });

    it("should match snapshop with all data passed in correctly", () => {
      expect(page).toMatchSnapshot();
    });

    it("should match snapshop if there is user logged but no ratings", () => {
      const pageNoRatings = shallow(<RatingsPage {...mockProps} ratings={[]} />);
      expect(pageNoRatings).toMatchSnapshot();
    });

    it("should match snapshop if there is no user logged", () => {
      const pageNoUser = shallow(<RatingsPage {...mockProps} login={false} />)
      expect(pageNoUser).toMatchSnapshot();
    });

    it("should match snapshop if redirect is true", () => {
      page.setState({isRedirected: true})
      expect(page).toMatchSnapshot();
    });

    it("should call createCards after rendering", () => {
      const spy = jest.spyOn(instance, 'createCards').mockImplementation(() => {});
      instance.forceUpdate();
      expect(spy).toHaveBeenCalled();
    });

    it("should call redirect after back button was clicked", () => {
      const spy = jest.spyOn(instance, 'redirect').mockImplementation(() => {});
      instance.forceUpdate();

      page.find('button').simulate('click');

      expect(spy).toHaveBeenCalled();
    });

    it("should change isRedirect state to true when redirect is called", () => {
      expect(page.state('isRedirected')).toEqual(false);

      instance.redirect();

      expect(page.state('isRedirected')).toEqual(true);
    });
  });

  describe("mapStateToProps", () => {
    it("shoud return an object with movies, ratings arrays and login state", () => {
      const mockState = {
        ...mockProps,
        isLoaded: true,
        error: ''
      };

      const expected = {
        ...mockProps
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });
});
