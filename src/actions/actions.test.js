import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of ADD_MOVIES for addMovies action', () => {
    // Setup
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

    const expectedAction = {
      movies: mockMoviesData,
      type: 'ADD_MOVIES'
    };

    // Execution
    const result = actions.addMovies(mockMoviesData);

    // Expectation
    expect(result).toEqual(expectedAction);
  });

  it('should have a type of IS_LOADED for addLoaded action', () => {
    // Setup
    const expectedAction = {
      isLoaded: true,
      type: 'IS_LOADED'
    };

    // Execution
    const result = actions.addLoaded(true);

    // Expectation
    expect(result).toEqual(expectedAction);
  });

  it('should have a type of HAS_ERROR for hasError action', () => {
    // Setup
    const expectedAction = {
      error: 'It is error',
      type: 'HAS_ERROR'
    };

    // Execution
    const result = actions.hasError('It is error');

    // Expectation
    expect(result).toEqual(expectedAction);
  });
});
