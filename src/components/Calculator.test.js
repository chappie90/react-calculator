import React from 'react';
import { shallow, mount } from 'enzyme';

import Calculator from './Calculator';
import Display from './Display';
import Keypad from './Keypad';

describe('Calculator', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<Calculator />));

  it('should render 2 <div />\s', () => {
    expect(wrapper.find('div').length).toEqual(2);
  });

  it('should render the Display and Keypad Components', () => {
    const display = wrapper.find(Display);
    const keypad = wrapper.find(Keypad);
    expect(wrapper.containsAllMatchingElements([
      <Display 
        displayValue={display.props().displayValue} 
        computedDisplayValue={display.props().computedDisplayValue}
        expressionEvaluated={display.props().expressionEvaluated}
      />,
      <Keypad 
        updateDisplayValue={keypad.props().updateDisplayValue}
      />
    ])).toEqual(true);
  });
});

describe('updateDisplayValue', () => {
  let wrapper;

  beforeEach(() => wrapper = mount(<Calculator />));

  it('updates display value when a number is clicked', () => {
    wrapper.find('.key[children="5"]').simulate('click');
    expect(wrapper.find(Display).prop('displayValue')).toEqual('5');
  });

  it('updates display value when an operator is clicked', () => {
    wrapper.find('.key[children="7"]').simulate('click');
    wrapper.find('.operator[children="+"]').simulate('click');
    expect(wrapper.find(Display).prop('displayValue')).toEqual('7+');
  });

  it('prevents multiple instances of "." in displayValue', () => {
    const decimalPoint = wrapper.find('.key[children="."]');
    decimalPoint.simulate('click');
    decimalPoint.simulate('click');
    expect(wrapper.find(Display).prop('displayValue')).toEqual('0.');
  });

  it('prevents multiple instances of operators in displayValue', () => {
    const plusOperator = wrapper.find('.key[children="+"]');
    wrapper.find('.key[children="5"]').simulate('click');
    plusOperator.simulate('click');
    plusOperator.simulate('click');
    expect(wrapper.find(Display).prop('displayValue')).toEqual('5+')
  });

  it('resets display value when C operator is clicked', () => {
    wrapper.find('.key[children="5"]').simulate('click');
    wrapper.find('.key[children="C"]').simulate('click');
    expect(wrapper.find(Display).prop('displayValue')).toEqual('0');
  });
});

describe('callOperator', () => {
  let wrapper,
      number,
      plusOperator,
      equalOperator;

  beforeEach(() => {
    wrapper = mount(<Calculator />);
    number = wrapper.find('.key[children="5"]');
    plusOperator = wrapper.find('.key[children="+"]');
    equalOperator = wrapper.find('.key[children="="]');
  });

  it('updates computedValue when expression is evaluated', () => { 
    number.simulate('click');
    plusOperator.simulate('click');
    number.simulate('click');
    equalOperator.simulate('click');
    expect(wrapper.find(Display).prop('computedDisplayValue')).toEqual('10')
  });

  it('resets computedValue when C operator is clicked', () => {
    number.simulate('click');
    plusOperator.simulate('click');
    number.simulate('click');
    equalOperator.simulate('click');
    wrapper.find('.key[children="C"]').simulate('click');
    expect(wrapper.find(Display).prop('computedDisplayValue')).toBeNull();
  });

  it('shows error on division by 0', () => {
    number.simulate('click');
    wrapper.find('.key[children="/"]').simulate('click');
    wrapper.find('.key[children="0"]').simulate('click');
    equalOperator.simulate('click');
    expect(wrapper.find(Display).prop('computedDisplayValue')).toEqual('E');
  });

});