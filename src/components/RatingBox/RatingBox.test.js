import React from 'react';
import { shallow } from 'enzyme';
import RatingBox from './RatingBox';
import { postRating } from '../../apiCalls/apiCalls'

jest.mock('../../apiCalls/apiCalls');

describe("RatingBox", () => {
  let box, instance;

  beforeEach(() => {
    box = shallow(
      <RatingBox
        user_id={1}
        movie_id={2}/>
    )

    instance = box.instance()
  });

  it("should match snapshot with all data passed in correctly and isClicked state is false", () => {
    expect(box).toMatchSnapshot();
  });

  it("should match snapshot with all data passed in correctly and isClicked state is true", () => {
    box.setState({isClicked: true});
    expect(box).toMatchSnapshot();
  });

  it("should call toggleClicked when button is clicked", () => {
    const spy = jest.spyOn(instance, 'toggleClicked').mockImplementation(() => {});
    instance.forceUpdate();

    box.find('button').simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it("should call toggleClicked when cancel img is clicked", () => {
    box.setState({isClicked: true});

    const spy = jest.spyOn(instance, 'toggleClicked').mockImplementation(() => {});
    instance.forceUpdate();

    box.find('img').simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it("should change isClicked state when toggleClicked is called", () => {
    expect(box.state('isClicked')).toEqual(false);

    instance.toggleClicked();

    expect(box.state('isClicked')).toEqual(true);
  });

  describe("chooseRating", () => {
    beforeEach(() => {
      box.setState({isClicked: true});

      postRating.mockImplementation(() => {
        return Promise.resolve({
          id: 1, movie_id: 1, user_id: 1
        })
      })
    });

    it("should call chooseRating when rating number is clicked", () => {
      const spy = jest.spyOn(instance, 'chooseRating').mockImplementation(() => {});
      instance.forceUpdate();

      box.find('#number2').simulate('click');

      expect(spy).toHaveBeenCalled();
    });

    it("should call postRating when chooseRating is called", async () => {
      await instance.chooseRating({
        target: {
          getAttribute: () => 'number1'
        }
      });

      expect(postRating).toHaveBeenCalled();
    });

    it("should call toggleClicked when chooseRating is called", async () => {
      const spy = jest.spyOn(instance, 'toggleClicked').mockImplementation(() => {});

      instance.forceUpdate();

      await instance.chooseRating({
        target: {
          getAttribute: () => 'number1'
        }
      });

      expect(spy).toHaveBeenCalled();
    });

  });
});
