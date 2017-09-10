import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Key from '../../common/Key'

const EpgDown = ({title, color, disabled, accessibilityLabel}) => {
  return (
    <Key 
      title={title}
      color={color}
      disabled={disabled}
      keyCode="epg_dwn"
      accessibilityLabel={accessibilityLabel}
    />
  )
}

EpgDown.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
}

export default EpgDown