import { error } from '../reducers/error';

describe('error', () => {
  it('should return the initial state', () => {
    // Setup
    const expected = '';

    // Execution
    const result = error(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the error value if action type is HAS_ERROR', () => {
    // Setup
    const mockAction = {
      type: 'HAS_ERROR',
      error: 'It is error'
    }

    const expected = 'It is error';

    // Execution
    const result = error(null, mockAction);

    // Expectation
    expect(result).toEqual(expected);
  });
});
