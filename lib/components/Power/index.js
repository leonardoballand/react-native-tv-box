import React from 'react'
import PropTypes from 'prop-types'

import Key from '../../common/Key'

const Power = ({TvBox, title, color, disabled, accessibilityLabel}) => {
  if (TvBox === 'livebox') {
    color = 'orange'
  }

  return (
    <Key 
      title={title}
      color={color}
      disabled={disabled}
      keyCode="power"
      accessibilityLabel={accessibilityLabel}
    />
  )
}

Power.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
}

export default Power