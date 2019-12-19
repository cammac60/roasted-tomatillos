import React from 'react';
import Provider from 'react-redux';
import {
  MoviesContainer,
  mapStateToProps,
  mapDispatchToProps } from './MoviesContainer';
import { shallow } from 'enzyme';
import { getMovies } from '../../apiCalls/apiCalls';
import {
  addMovies,
  addLoaded,
  hasError } from '../../actions';

jest.mock('../../apiCalls/apiCalls');

describe("MoviesContainer", () => {
  let container, instance;

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
  const addMovies = jest.fn();
  const addLoaded = jest.fn();
  const hasError = jest.fn();

  const store = {
    movies: mockMoviesData,
    isLoaded: true,
    error: '',
    addMovies: addMovies,
    addLoaded: addLoaded,
    hasError: hasError
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
    const containerLoading = shallow(
      <MoviesContainer {...store} error="Failed to fetch" />
    );
    expect(containerLoading).toMatchSnapshot();
  });

  it("should call createCards method after rendering", () => {
    const spy = jest.spyOn(instance, 'createCards')
      .mockImplementation(() => {});
    instance.forceUpdate()

    expect(spy).toHaveBeenCalled();
  });

  it("should call fetchMoviesData method after rendering if there is no movies passed in props", async () => {
    const containerWithoutMovies = shallow(
      <MoviesContainer {...store}
        error='no movies'
        movies={[ ]} />
    );

    const instance = containerWithoutMovies.instance()

    const spy = jest.spyOn(instance, 'fetchMoviesData')
      .mockImplementation(() => {
        return Promise.resolve(mockMoviesData)
      });

    instance.forceUpdate()

    await instance.componentDidMount()

    expect(spy).toHaveBeenCalled();
  });

  it("should not call fetchMoviesData method after rendering if there are movies passed in props", async () => {
    const spy = jest.spyOn(instance, 'fetchMoviesData')
      .mockImplementation(() => {
        return Promise.resolve(mockMoviesData)
      });

    instance.forceUpdate()

    await instance.componentDidMount()

    expect(spy).toHaveBeenCalledTimes(0);
  });

  describe("fetchMoviesData", () => {
    beforeEach(() => {
      getMovies.mockImplementation(() => {
        return Promise.resolve({movies: mockMoviesData})
      });
    });

    it("should call getMovies", async () => {
      await instance.fetchMoviesData()

      expect(getMovies).toHaveBeenCalled();
    });

    it("should call addMovies prop with movies as argument if fetch is completed correctly", async () => {

      await instance.fetchMoviesData()

      expect(addMovies).toHaveBeenCalledWith(mockMoviesData);
    });

    it("should call addLoaded with true as argument prop if fetch is completed correctly", async () => {
      await instance.fetchMoviesData()

      expect(addLoaded).toHaveBeenCalledWith(true);
    });

    it("should call addLoaded prop with false as argument if fetch is failed ", async () => {
      getMovies.mockImplementation(() => {
        return Promise.reject(Error('Failed to fetch'))
      });

      await instance.fetchMoviesData()

      expect(addLoaded).toHaveBeenCalledWith(false);
    });

    it("should call hasError prop with error as argument if fetch is failed ", async () => {
      getMovies.mockImplementation(() => {
        return Promise.reject(Error('Failed to fetch'))
      });

      await instance.fetchMoviesData()

      expect(hasError).toHaveBeenCalledWith('Failed to fetch');
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

  describe('mapDispatchToProps', () => {
    // NOTE: need to be fixed and checking with argument
    it('calls dispatch with an addMovies action when addMovies is called', () => {
      // Setup
      const mockDispatch = jest.fn();
      const actionToDispatch = addMovies({title: 'Frozen II'});

      // Execution
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addMovies({title: 'Frozen II'});

      // Expectaion
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
