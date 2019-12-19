import React from 'react';
import { shallow } from 'enzyme';
import { App, mapDispatchToProps } from './App';
import { getMovies } from '../../apiCalls/apiCalls';
import { addMovies, addLoaded, hasError } from '../../actions';

jest.mock('../../apiCalls/apiCalls');

describe("App", () => {
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

  describe("App component", () => {
    let app, instance;
    const addMovies = jest.fn();
    const addLoaded = jest.fn();
    const hasError = jest.fn();

    beforeEach(() => {
      app = shallow(
        <App
          addMovies={addMovies}
          addLoaded={addLoaded}
          hasError={hasError} />
      )
      instance = app.instance()
    });

    it("should match snapshot", () => {
      expect(app).toMatchSnapshot();
    });

    it("should call fetchMoviesData method after rendering", async () => {
      const spy = jest.spyOn(instance, 'fetchMoviesData')
        .mockImplementation(() => {
          return Promise.resolve(mockMoviesData)
        });

      instance.forceUpdate()

      await instance.componentDidMount()

      expect(spy).toHaveBeenCalled();
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
  });

  describe('mapDispatchToProps', () => {
    let mockDispatch, mappedProps;

    beforeEach(() => {
      mockDispatch = jest.fn();
      mappedProps = mapDispatchToProps(mockDispatch);
    });

    it('calls dispatch with an addMovies action when addMovies is called', () => {
      // Setup
      const actionToDispatch = addMovies(mockMoviesData);
      // Execution
      mappedProps.addMovies(mockMoviesData);
      // Expectaion
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('calls dispatch with an addLoaded action when addLoaded is called', () => {
      // Setup
      const actionToDispatch = addLoaded(mockMoviesData);
      // Execution
      mappedProps.addLoaded(mockMoviesData);
      // Expectaion
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('calls dispatch with an hasError action when hasError is called', () => {
      // Setup
      const actionToDispatch = hasError(mockMoviesData);
      // Execution
      mappedProps.hasError(mockMoviesData);
      // Expectaion
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
