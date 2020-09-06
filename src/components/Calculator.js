import React, { useState } from 'react';

import { operators } from '../utils/constants';
import Display from './Display';
import Keypad from './Keypad';
import Key from './Key';
import '../styles/calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [computedDisplayValue, setComputedDisplayValue] = useState(null);
  const [expressionEvaluated, setExpressionEvaluated] = useState(false);
  const [allowDecimalPoint, setAllowDecimalPoint] = useState(true);
  const [newExpression, setNewExpression] = useState(true);

  const updateDisplayValue = (newValue, keyType) => {
    let newDisplayValue;

    if (newValue === '.') {
      setAllowDecimalPoint(false);
    }
    if (newValue === '.' && !allowDecimalPoint) return;
    if (newValue === '.' && operators.includes(displayValue.slice(-1))) {
      newValue = `0${newValue}`;
    }

    if (keyType === 'operator') {
      setAllowDecimalPoint(true);
    }
    if (displayValue === '-' && newValue === '+') setDisplayValue('0');
    if (
      keyType === 'operator' && 
      newValue !== '-' && 
      (displayValue === '0' || displayValue === '-')
    ) return;
    if (keyType === 'operator' && operators.includes(displayValue.slice(-1))) {
      let replaceOperator = displayValue.slice(0, -1) + newValue;
      setDisplayValue(replaceOperator);
      return; 
    }

    if (newExpression && !operators.includes(newValue)) {
      newDisplayValue = newValue === '.' ? `0${newValue}` : newValue;
    } else {
      newDisplayValue = displayValue === '0' && newValue !== '.' ? 
        newValue : 
        displayValue + newValue;
    }
    
    setNewExpression(false);
    setDisplayValue(newDisplayValue);
  };

  const callOperator = (operator) => {
    switch (operator) {
      case 'C':
        setDisplayValue('0');
        setComputedDisplayValue(null);
        setExpressionEvaluated(false);
        setNewExpression(true);
        setAllowDecimalPoint(true);
        break;
      case '=':
        let expression;

        if (displayValue === '-') return;

        if (displayValue.includes('E')) {
          setDisplayValue('E');
          setComputedDisplayValue('E');
          setExpressionEvaluated(true);
          setAllowDecimalPoint(true);
          setNewExpression(true);
          return;
        }

        if (operators.includes(displayValue.slice(-1))) {
          expression = displayValue.slice(0, -1);
        } else {
          expression = displayValue;
        }

        let result = eval(expression);

        if (result === Infinity) {
          result = 'E';
        } else {
          result = result.toString();
        }    

        setDisplayValue(result);
        setComputedDisplayValue(result);
        setExpressionEvaluated(true);
        setAllowDecimalPoint(true);
        setNewExpression(true);
        break;
      default:
        return;
    }
  };

  return (
    <div className="calculator">
      <div className="display-wrapper">
        <Key 
          className="delete-key"
          type="operator" 
          value="C" 
          action={() => callOperator('C')} 
        />
        <Display 
          displayValue={displayValue} 
          computedDisplayValue={computedDisplayValue} 
          expressionEvaluated={expressionEvaluated}
        />
      </div>
      <Keypad updateDisplayValue={updateDisplayValue} callOperator={callOperator} />
    </div>
  );
};

export default Calculator;