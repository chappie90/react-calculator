import React from 'react';
import PropTypes from 'prop-types';

import '../styles/display.css';

const Display = ({ displayValue, computedDisplayValue, expressionEvaluated }) => {
  return (
    <div className="display">
      <span className="display-value display-computed-value">
        {expressionEvaluated ? computedDisplayValue : null}
      </span>
      <span className={displayValue.length < 9 ? 
        'display-value display-value-big' : 
        'display-value display-value-small'
      }>
        {displayValue}
      </span>
    </div>
  );
};

Display.propTypes = { 
  displayValue: PropTypes.string.isRequired,
  computedDisplayValue: PropTypes.string,
  expressionEvaluated: PropTypes.bool.isRequired
};

export default Display;