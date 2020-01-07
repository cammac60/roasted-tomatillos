import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { getMovies, getRatings } from '../../apiCalls/apiCalls';
import { addMovies, addLoaded, hasError, addRatings } from '../../actions';

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
  const mockRatingsData =
    [{
      id: 1,
      user_id: 1,
      movie_id: 1,
      rating: 7,
      created_at: "2019-12-16",
      updated_at: "2019-12-16"
    }];

  describe("App component", () => {
    let app, instance;
    const addMovies = jest.fn();
    const addLoaded = jest.fn();
    const hasError = jest.fn();
    const addRatings = jest.fn();

    const mockProps = {
      isLoaded: true,
      user: {},
      addMovies: addMovies,
      addLoaded: addLoaded,
      hasError: hasError,
      addRatings: addRatings
    }

    beforeEach(() => {
      app = shallow(
        <App {...mockProps} />
      )

      instance = app.instance()
    });

    it("should match snapshot", () => {
      expect(app).toMatchSnapshot();
    });

    describe("fetchMoviesData", () => {
      beforeEach(() => {
        getMovies.mockImplementation(() => {
          return Promise.resolve({movies: mockMoviesData})
        });

        app = shallow(
          <App
            {...mockProps}
            isLoaded={false} />
        )

        instance = app.instance()
      });

      it("should call fetchMoviesData method after rendering if there is no fetched movies data", async () => {
        const spy = jest.spyOn(instance, 'fetchMoviesData')
          .mockImplementation(() => {
            return Promise.resolve(mockMoviesData)
          });
        instance.forceUpdate()

        await instance.componentDidMount()

        expect(spy).toHaveBeenCalled();
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

    describe("fetchRatingsData", () => {
      beforeEach(() => {
        getRatings.mockImplementation(() => {
          return Promise.resolve({ratings: mockRatingsData})
        });

        app = shallow(
          <App
            {...mockProps}
            user={{id:1}}
            login={true} />
        )

        instance = app.instance()
      });

      it("should call fetchRatingsData method after rendering if there is user logged", async () => {
        const spy = jest.spyOn(instance, 'fetchRatingsData')
          .mockImplementation(() => {
            return Promise.resolve(mockRatingsData)
          });
        instance.forceUpdate()

        await instance.componentDidMount()

        expect(spy).toHaveBeenCalled();
      });

      it("should call getRatings", async () => {
        await instance.fetchRatingsData()

        expect(getRatings).toHaveBeenCalledWith(1);
      });

      it("should call addRatings prop with movies as argument if fetch is completed correctly", async () => {

        await instance.fetchRatingsData()

        expect(addRatings).toHaveBeenCalledWith(mockRatingsData);
      });

      it("should call addRatings prop with error as argument if fetch is failed ", async () => {
        getRatings.mockImplementation(() => {
          return Promise.reject(Error('Failed to fetch'))
        });

        await instance.fetchRatingsData()

        expect(addRatings).toHaveBeenCalledWith([ ]);
      });
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with login state and user id', () => {
      // Setup
      const mockState = {
        isLoaded: true,
        user_id: 1,
        user: {id: 1}
      };

      const expected = {
        isLoaded: true,
        user: {id: 1}
      };

      // Execution
      const mappedProps = mapStateToProps(mockState);

      // Expectation
      expect(mappedProps).toEqual(expected);
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

    it('calls dispatch with an addRatings action when addRatings is called', () => {
      // Setup
      const actionToDispatch = addRatings(mockRatingsData);
      // Execution
      mappedProps.addRatings(mockRatingsData);
      // Expectaion
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
