import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Key from '../Key'

const Power = ({props}) => {
  return (
    <Key 
      title={props.title}
      color={props.color}
      disabled={props.disabled}
      keyCode="power"
      accessibilityLabel="Power ON and OFF your tv box"
    />
  )
}

Power.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Power