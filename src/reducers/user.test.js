import { user } from '../reducers/user';

describe('user', () => {
  it('should return the initial state', () => {
    // Execution
    const result = user(undefined, {});

    // Expectation
    expect(result).toEqual(null);
  });

  it('should return the user value if action type is ADD_USER', () => {
    // Setup
    const mockUser = {
      id: 1,
      email: 'email@mail.com',
      password: 'password'
    };

    const mockAction = {
      type: 'ADD_USER',
      user: mockUser
    };

    const expected = mockUser;

    // Execution
    const result = user(null, mockAction);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return null if action type is REMOVE_USER', () => {
    // Setup
    const mockAction = {
      type: 'REMOVE_USER',
      user: null
    };

    const expected = null;

    // Execution
    const result = user(null, mockAction);

    // Expectation
    expect(result).toEqual(expected);
  });
});
