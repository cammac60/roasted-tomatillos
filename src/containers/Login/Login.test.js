import React from 'react';
import { Login, mapDispatchToProps } from './Login.js';
import { shallow } from 'enzyme';

describe('Login', () => {
  let container, instance;

  beforeEach(() => {
    container = shallow(<Login />);
    instance = container.instance();
  });

  it('Should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('Should attempt to login when the button is clicked', () => {
    instance.handleSubmit = jest.fn();
    container.find('.sign-in').simulate('click');
    expect(instance.handleSubmit).toHaveBeenCalled();
  });

  it('Should have blank strings as a default for all state values', () => {
    expect(instance.state).toEqual({
      email: '',
      password: '',
      errorMsg: ''
    });
  });

  describe('validateForm', () => {

    it('Should update the error message if there is no email and password', () => {
      instance.validateForm();
      expect(instance.state.errorMsg).toEqual('Please enter an email and a password');
    });

    it('Should return false if there is no email and password entered', () => {
      expect(instance.validateForm()).toEqual(false);
    });

    it('Should return true if there is an email and password entered', () => {
      instance.state = {
        email: 'test email',
        password: 'test password',
        errorMsg: ''
      }
      expect(instance.validateForm()).toEqual(true);
    });

  });

});
