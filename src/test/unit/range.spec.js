/**
 * @jest-environment jsdom
 */

import React from 'react';
import { create } from 'react-test-renderer';
import { mount, shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Range from '../../components/range';

configure({ adapter: new Adapter() });

const props = {
  min: 1,
  max: 100,
  onChange: jest.fn(),
};

describe('Range', () => {
  let wrapper;
  let container;
  let requestAnimationFrame;

  beforeEach(() => {
    wrapper = shallow(<Range {...props} />);

    requestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => callback();

    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('should render correctly', () => {
    const wrapper = create(<Range {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('initial render values min and max must be equal 1 and 100', () => {
    const wrapper = shallow(<Range {...props} />);

    const minValue = wrapper.find('input').at(0);
    const maxValue = wrapper.find('input').at(1);

    expect(minValue.props().value).toEqual(1);
    expect(maxValue.props().value).toEqual(100);
  });

  describe('changing minValue', () => {
    beforeEach(() => {
      wrapper = shallow(<Range {...props} />);
      const minValue = wrapper.find('input').at(0);

      minValue.simulate('change', {
        target: { value: 50 },
      });
    });

    it('should be change minValue', () => {
      const minValue = wrapper.find('input').at(0);
      expect(minValue.props().value).toEqual(50);
    });
  });

  describe('changing maxValue', () => {
    beforeEach(() => {
      wrapper = shallow(<Range {...props} />);
      const maxValue = wrapper.find('input').at(0);

      maxValue.simulate('change', {
        target: { value: 80 },
      });
    });

    it('should be change maxValue', () => {
      const maxValue = wrapper.find('input').at(0);
      expect(maxValue.props().value).toEqual(80);
    });
  });
});
