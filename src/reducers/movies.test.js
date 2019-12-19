import { movies } from '../reducers/movies';

describe('movies', () => {
  it('should return the initial state', () => {
    // Setup
    const expected = [];

    // Execution
    const result = movies(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the movies array if action type is ADD_MOVIES', () => {
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

    const mockAction = {
      type: 'ADD_MOVIES',
      movies: mockMoviesData
    }

    const expected = mockMoviesData;

    // Execution
    const result = movies(null, mockAction);

    // Expectation
    expect(result).toEqual(expected);
  });
});
