import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Key from '../../common/Key'

const DirectionUp = ({title, color, disabled, accessibilityLabel}) => {
  return (
    <Key 
      title={title}
      color={color}
      disabled={disabled}
      keyCode="up"
      accessibilityLabel={accessibilityLabel}
    />
  )
}

DirectionUp.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
}

export default DirectionUp