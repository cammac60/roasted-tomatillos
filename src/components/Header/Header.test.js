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

  it.skip('Should call the remove user method when the logout button is clicked', () => {
    wrapper = shallow(<Header user={true}/>);
    const mockDispatch = jest.fn();
    wrapper.find('#logout').simulate('click');
    expect(mockDispatch).toHaveBeenCalled();
  });

});
