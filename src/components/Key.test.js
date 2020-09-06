import React from 'react';
import { shallow } from 'enzyme';

import Key from './Key';

describe('Key', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(
    <Key type={''} value={''} action={jest.fn()} className={''} />
  ));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the key value', () => {
    wrapper.setProps({ value: 'keyValue' });
    expect(wrapper.text()).toEqual('keyValue');
  });
});