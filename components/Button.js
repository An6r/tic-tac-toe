import React from 'react';
import { PropTypes } from 'prop-types';
import FontAwesome from 'react-fontawesome';

const Button = ({ icon, disabled = false, label, ...props }) => (
  <button className='button' disabled={disabled} {...props}>
	<FontAwesome name={icon} {...props} />

    {label}
  </button>
);

Button.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default Button;