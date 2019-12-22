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
    const mockRatingsData =
      [{
        id: 2,
        user_id: 2,
        movie_id: 2,
        rating: 7,
        created_at: "2019-12-16",
        updated_at: "2019-12-16"
      }];

    const mockAction = {
      type: 'ADD_RATINGS',
      ratings: mockRatingsData
    }

    const expected = mockRatingsData;

    // Execution
    const result = ratings(null, mockAction);

    // Expectation
    expect(result).toEqual(expected);
  });
});
