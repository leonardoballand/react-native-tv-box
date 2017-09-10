import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Key from '../../../common/Key'

const Keypad3 = ({title, color, disabled, accessibilityLabel}) => {
  return (
    <Key 
      title={title}
      color={color}
      disabled={disabled}
      keyCode="3"
      accessibilityLabel={accessibilityLabel}
    />
  )
}

Keypad3.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
}

export default Keypad3