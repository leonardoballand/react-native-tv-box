import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Key from '../../../common/Key'

const Keypad2 = ({title, color, disabled, accessibilityLabel}) => {
  return (
    <Key 
      title={title}
      color={color}
      disabled={disabled}
      keyCode="2"
      accessibilityLabel={accessibilityLabel}
    />
  )
}

Keypad2.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
}

export default Keypad2