import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Key from '../../../common/Key'

const Keypad4 = ({
  children,
  title,
  containerStyle,
  titleStyle,
  disabled,
  accessibilityLabel,
  onKeyPress,
  onKeyLongPress,
}) => {
  return (
    <Key
      title={title}
      containerStyle={containerStyle}
      titleStyle={titleStyle}
      disabled={disabled}
      keyCode="4"
      accessibilityLabel={accessibilityLabel}
      onKeyPress={onKeyPress}
      onKeyLongPress={onKeyLongPress}
    >
      {children}
    </Key>
  )
}

Keypad4.propTypes = {
title: PropTypes.string,
children: PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object,
  PropTypes.element,
]),
containerStyle: PropTypes.object,
titleStyle: PropTypes.object,
disabled: PropTypes.bool,
accessibilityLabel: PropTypes.string,
onKeyPress: PropTypes.func,
onKeyLongPress: PropTypes.func,
}

export default Keypad4