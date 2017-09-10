import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Key from '../../common/Key'

const VolumeDown = ({title, color, disabled, accessibilityLabel}) => {
  return (
    <Key 
      title={title}
      color={color}
      disabled={disabled}
      keyCode="vol_dwn"
      accessibilityLabel={accessibilityLabel}
    />
  )
}

VolumeDown.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
}

export default VolumeDown