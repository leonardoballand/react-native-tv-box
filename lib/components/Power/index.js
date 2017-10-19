import React from 'react'
import PropTypes from 'prop-types'

import Key from '../../common/Key'

const Power = ({onKeyPress, onKeyLongPress, title, color, disabled, accessibilityLabel}) => {
  return (
    <Key 
      title={title}
      color={color}
      disabled={disabled}
      keyCode="power"
      accessibilityLabel={accessibilityLabel}
      onKeyPress={onKeyPress}
      onKeyLongPress={onKeyLongPress}
    />
  )
}

Power.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  onKeyPress: PropTypes.func,
  onKeyLongPress: PropTypes.func,
}

export default Power