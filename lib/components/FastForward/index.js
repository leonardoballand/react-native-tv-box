import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Key from '../../common/Key'

const FastForward = ({title, color, disabled, accessibilityLabel}) => {
  return (
    <Key 
      title={title}
      color={color}
      disabled={disabled}
      keyCode="fforward"
      accessibilityLabel={accessibilityLabel}
    />
  )
}

FastForward.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
}

export default FastForward