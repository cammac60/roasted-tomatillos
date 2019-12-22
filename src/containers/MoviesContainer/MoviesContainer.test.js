import React from 'react';
import { MoviesContainer, mapStateToProps } from './MoviesContainer';
import { shallow } from 'enzyme';

describe("MoviesContainer", () => {
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

  describe("MoviesContainer component", () => {
    let container, instance;

    const store = {
      movies: mockMoviesData,
      isLoaded: true,
      error: '',
    }

    beforeEach(() => {
      container = shallow(
        <MoviesContainer {...store} />
      );

      instance = container.instance();
    });

    it("should match snapshot if data was loaded and no error", () => {
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot if data is loading", () => {
      const containerLoading = shallow(
        <MoviesContainer {...store} isLoaded={false} />
      );
      expect(containerLoading).toMatchSnapshot();
    });

    it("should match snapshot if there is error after fetch", () => {
      const containerError = shallow(
        <MoviesContainer {...store} error="Failed to fetch" />
      );
      expect(containerError).toMatchSnapshot();
    });

    it("should call createCards method after rendering", () => {
      const spy = jest.spyOn(instance, 'createCards')
        .mockImplementation(() => {});
      instance.forceUpdate()

      expect(spy).toHaveBeenCalled();
    });

  });

  describe('mapStateToProps', () => {
    it('should return an object with the movies array, isLoaded and error', () => {
      // Setup
      const mockState = {
        movies: mockMoviesData,
        isLoaded: true,
        error: '',
        user: {name: 'Ray'}
      };

      const expected = {
        movies: mockMoviesData,
        isLoaded: true,
        error: ''
      };

      // Execution
      const mappedProps = mapStateToProps(mockState);

      // Expectation
      expect(mappedProps).toEqual(expected);
    });
  });
});
