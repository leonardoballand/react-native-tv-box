import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Platform } from 'react-native'

import Keypad0 from './Keypad0'
import Keypad1 from './Keypad1'
import Keypad2 from './Keypad2'
import Keypad3 from './Keypad3'
import Keypad4 from './Keypad4'
import Keypad5 from './Keypad5'
import Keypad6 from './Keypad6'
import Keypad7 from './Keypad7'
import Keypad8 from './Keypad8'
import Keypad9 from './Keypad9'

const Keypad = ({color, disabled, reverse}) => {
  
  if (color) {
    Platform.OS === 'android' ? keypadStyles.backgroundColor = color : keypadStyles.color = color
  }

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row'}}>
        <Keypad1 />
        <Keypad2 />
        <Keypad3 />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Keypad4 />
        <Keypad5 />
        <Keypad6 />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Keypad7 />
        <Keypad8 />
        <Keypad9 />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Keypad0 />
      </View>
    </View>
  )
}

Keypad.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  reverse: PropTypes.bool,
}

export default Keypad