import React from 'react';
import { PropTypes } from 'prop-types';
import FontAwesome from 'react-fontawesome';

const Icon = ({ name, ...props }) => (
  <FontAwesome
    name={name}
    {...props}
  />
);

Icon.propTypes = {
  /**
   * The name of the icon.
   */
  name: PropTypes.string.isRequired,
};

export default Icon;
