import React from 'react';
import PropTypes from 'prop-types';

import '../styles/key.css';

const Key = ({ type, value, action, className }) => {
  return (
    <div 
      className={className ? `key ${className}` : 'key'}
      onClick={() => action(value, type)}
    >
      {value}
    </div>
  );
};

Key.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Key;