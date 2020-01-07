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

  it('should have a type of ADD_RATINGS for addRatings action', () => {
    // Setup
    const mockRatings = [{id: 1, movie_id: 1, rating: 6}];
    const expectedAction = {
      ratings: mockRatings,
      type: 'ADD_RATINGS'
    };

    // Execution
    const result = actions.addRatings(mockRatings);

    // Expectation
    expect(result).toEqual(expectedAction);
  });

  it('should have a type of ADD_RATING for addRating action', () => {
    // Setup
    const mockRating = {id: 1, movie_id: 1, rating: 6};
    const expectedAction = {
      rating: mockRating,
      type: 'ADD_RATING'
    };

    // Execution
    const result = actions.addRating(mockRating);

    // Expectation
    expect(result).toEqual(expectedAction);
  });

  it('should have a type of ADD_USER for addUser action', () => {
    // Setup
    const mockUser = {id: 1, email: 'email@mail.com', password: 'password'};
    const expectedAction = {
      user: mockUser,
      type: 'ADD_USER'
    };

    // Execution
    const result = actions.addUser(mockUser);

    // Expectation
    expect(result).toEqual(expectedAction);
  });

  it('should have a type of REMOVE_USER for removeUser action', () => {
    // Setup
    const expectedAction = {
      user: null,
      type: 'REMOVE_USER'
    };

    // Execution
    const result = actions.removeUser();
        // Expectation
    expect(result).toEqual(expectedAction);
  });
  
  it('should have a type of ADD_SELECTED_MOVIE for addSelectedMovie action', () => {
    // Setup
    const expectedAction = {
      id: 1,
      type: 'ADD_SELECTED_MOVIE'
    };

    // Execution
    const result = actions.addSelectedMovie(1);
    // Expectation
    expect(result).toEqual(expectedAction);
  });
});
