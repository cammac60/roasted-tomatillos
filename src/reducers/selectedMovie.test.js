import { selectedMovie } from '../reducers/selectedMovie';

describe('selectedMovie', () => {
  it('should return the initial state as null', () => {
    // Setup
    const expected = null;

    // Execution
    const result = selectedMovie(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the selectedMovie value if action type is ADD_SELECTED_MOVIE', () => {
    // Setup
    const mockAction = {
      type: 'ADD_SELECTED_MOVIE',
      id: 1
    }

    // Execution
    const result = selectedMovie(null, mockAction);

    // Expectation
    expect(result).toEqual(1);
  });
});
