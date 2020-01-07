import React from 'react';
import { MovieInfoComponent, mapStateToProps } from './MovieInfoComponent';
import { shallow } from 'enzyme';

describe("MovieInfoComponent", () => {
  const mockMovieData = {
    id: 1,
    title: "Jumanji: The Next Level",
    poster_path: 'https://some.url/poster-image',
    backdrop_path: 'https://some.url/bg-image',
    release_date: '2019-12-04',
    overview: 'In Jumanji: The Next Level, the gang is back but the game has changed.',
    average_rating: 4
  };

  const mockRatingData = {
    id: 1,
    user_id: 1,
    movie_id: 1,
    rating: 7,
    created_at: "2019-12-16",
    updated_at: "2019-12-16"
  };

  describe("MovieInfoComponent component", () => {
    let container;

    const mockProps = {
      movie: mockMovieData,
      rating: mockRatingData,
      user: true,
      id: 1
    };

    beforeEach(() => {
      container = shallow(
        <MovieInfoComponent {...mockProps} />
      )
    });

    it("should match snapshot with all data passed in correctly", () => {
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot if redirected state is true", () => {
      container.setState({isRedirected: true});
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot if there is no user", () => {
      const containerWithoutUser = shallow(
        <MovieInfoComponent {...mockProps} user={false} />
      )
      expect(containerWithoutUser).toMatchSnapshot();
    });

    it("should match snapshot if there is user but no rating", () => {
      const containerWithoutRating = shallow(
        <MovieInfoComponent {...mockProps} rating={null} />
      )
      expect(containerWithoutRating).toMatchSnapshot();
    });
  });

  describe("mapStateToProps", () => {
    it('should return an object with the movie, rating and user object', () => {
      // Setup
      const mockState = {
        movies: [mockMovieData],
        ratings: [mockRatingData],
        error: '',
        user: {name: 'Ray'},
        selectedMovie: 1
      };

      const expected = {
        movie: mockMovieData,
        rating: mockRatingData,
        user: {name: 'Ray'}
      };

      // Execution
      const mappedProps = mapStateToProps(mockState);

      // Expectation
      expect(mappedProps).toEqual(expected);
    });
  });
});
