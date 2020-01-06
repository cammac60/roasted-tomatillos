import { ratings } from './ratings';

describe('ratings', () => {
  it('should return the initial state', () => {
    // Setup
    const expected = [];

    // Execution
    const result = ratings(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the ratings array if action type is ADD_RATINGS', () => {
    // Setup
    const mockRatings = [{id: 1, movie_id: 1, rating: 6}];

    const mockAction = {
      type: 'ADD_RATINGS',
      ratings: mockRatings
    }

    const expected = mockRatings;

    // Execution
    const result = ratings(null, mockAction);

    // Expectation
    expect(result).toEqual(expected);
  });
});
