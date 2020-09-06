import React from 'react';
import PropTypes from 'prop-types';

import { keypadKeys, operators } from '../utils/constants';
import Key from './Key';
import '../styles/keypad.css';

const Keypad = ({ updateDisplayValue, callOperator }) => {
  return (
    <div className="keypad">
      <ul className="list">
        {keypadKeys.map(item => {
          let keyType = operators.includes(item) ? 'operator' : 'number';
          return (
            <li className="item" key={item}>
              <Key 
                type={keyType} 
                value={item} 
                action={item === '=' ? callOperator : updateDisplayValue} 
                className={keyType}
              />
            </li>
          );
        })}
      </ul>
    </div>  
  );
};

Keypad.propTypes = {
  updateDisplayValue: PropTypes.func,
  callOperator: PropTypes.func
};

export default Keypad;