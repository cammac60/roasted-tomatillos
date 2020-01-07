import React from 'react';
import { Login, mapDispatchToProps } from './Login.js';
import { shallow } from 'enzyme';

describe('Login', () => {
  let container, instance, mockEvent;

  beforeEach(() => {
    container = shallow(<Login addUser={jest.fn()}/>);
    instance = container.instance();
    mockEvent = {
      target: {
        id: 'email',
        value: 'new value',
      },
      preventDefault: jest.fn()
    }
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

  describe('handleChange', () => {

    it('Should remove the error message if the fields are filled in', () => {
      instance.state = {
        email: 'test email',
        password: 'test password',
        errorMsg: 'test error'
      }
      instance.handleChange(mockEvent);
      expect(instance.state.errorMsg).toEqual('');
    });

    it('Should update the email in state if the target is the email input', () => {
      instance.handleChange(mockEvent);
      expect(instance.state.email).toEqual('new value');
    });

    it('Should update the password in state if the target is the password input', () => {
      mockEvent = {
        target: {
          id: 'password',
          value: 'new value'
        }
      }
      instance.handleChange(mockEvent);
      expect(instance.state.password).toEqual('new value');
    });

  });

  describe('handleSubmit', () => {

    it('Should update the error message in state if the form isn\'t validated', () => {
      instance.handleSubmit(mockEvent);
      expect(instance.state).toEqual({
        email: '',
        password: '',
        errorMsg: 'Please enter an email and a password'
      });
    });

    it('Should clear the state if the form is validated',  () => {
      instance.state = {
        email: 'test email',
        password: 'test password',
        errorMsg: ''
      };
      instance.handleSubmit(mockEvent);
      expect(instance.state).toEqual({
        email: '',
        password: '',
        errorMsg: ''
      });
    });

  });

});
