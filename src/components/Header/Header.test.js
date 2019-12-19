import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Header, mapStateToProps } from './Header';

describe('Header', () => {
  let wrapper, state;

  beforeEach(() => {
    wrapper = shallow(<Header login={false}/>);
    state = {
      login: false
    }
  });

  it('Should match the snapshot', () =>{
    expect(wrapper).toMatchSnapshot();
  });

  it('Should redirect when the button is clicked', () => {
    wrapper.find('.toggleLogin').simulate('click');
    expect(wrapper.instance().Redirect).toHaveBeenCalled();
  });

});
