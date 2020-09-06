import React from 'react';
import { shallow } from 'enzyme';

import { keypadKeys } from '../utils/constants';
import Keypad from './Keypad';
import Key from './Key';

describe('Keypad', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(
    <Keypad updateDisplayValue={jest.fn()} callOperator={jest.fn()} />
  ));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders all keypad key values', () => {
    expect(wrapper.find('.list .item').length).toEqual(keypadKeys.length);
  });

  it('should render multiple instances of Key component', () => {
    expect(wrapper.find(Key).length).toBeGreaterThan(1);
  });
});