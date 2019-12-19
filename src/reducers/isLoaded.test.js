import { isLoaded } from '../reducers/isLoaded';

describe('isLoaded', () => {
  it('should return the initial state', () => {
    // Setup
    const expected = false;

    // Execution
    const result = isLoaded(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the isLoaded value if action type is IS_LOADED', () => {
    // Setup
    const mockAction = {
      type: 'IS_LOADED',
      isLoaded: true
    }

    const expected = true;

    // Execution
    const result = isLoaded(null, mockAction);

    // Expectation
    expect(result).toEqual(expected);
  });
});
