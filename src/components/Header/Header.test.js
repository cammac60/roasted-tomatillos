import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Header, mapStateToProps, mapDispatchToProps } from './Header';

describe('Header', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<Header login={false}/>);
    instance = wrapper.instance();
  });

  it('Should match the snapshot if login is false', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should match the snapshot if login is true', () => {
    wrapper = shallow(<Header login={true}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should return a user object', () => {
    const mockState = {
      user: {email: 'email', id: 'id'}
    };
    const expected = {
      user: {email: 'email', id: 'id'}
    };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });

  it('Should call the remove user method when the logout button is clicked', () => {
    const removeUser = jest.fn();
    wrapper = shallow(<Header user={true} removeUser={removeUser}/>);
    wrapper.find('#logout').simulate('click');
    expect(removeUser).toHaveBeenCalled();
  });

});
