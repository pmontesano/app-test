/**
 * @jest-environment jsdom
 */

import React from 'react';
import { create } from 'react-test-renderer';
import { mount, shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RangeFixed from '../../components/rangeFixed';

configure({ adapter: new Adapter() });

const props = {
  min: 1.99,
  max: 70.99,
  values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
  onChange: jest.fn(),
};

describe('RangeFixed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RangeFixed {...props} />);
  });

  it('should render correctly', () => {
    const wrapper = create(<RangeFixed {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('initial render values min and max must be equal 1.99 and 70.99', () => {
    const wrapper = mount(<RangeFixed {...props} />);

    expect(wrapper.props().min).toEqual(1.99);
    expect(wrapper.props().max).toEqual(70.99);

    expect(wrapper.props().values).toEqual([
      1.99, 5.99, 10.99, 30.99, 50.99, 70.99,
    ]);
  });

  it('should render label', () => {
    const wrapper = shallow(<RangeFixed {...props} />);
    expect(wrapper.find('.range-slider-label')).toHaveLength(2);
  });

  it('should render buttons', () => {
    const wrapper = shallow(<RangeFixed {...props} />);
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('should render track', () => {
    const wrapper = shallow(<RangeFixed {...props} />);
    expect(wrapper.find('.range-slider-fixed__track')).toHaveLength(1);
  });
});
