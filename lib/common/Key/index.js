import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native'

import Keymaps from '../../../Keymaps.json'

const Key = ({
  title,
  children,
  containerStyle,
  titleStyle,
  keyCode,
  accessibilityLabel,
  disabled,
  onKeyPress,
  onKeyLongPress,
}) => {
  if (!title && !children) {
    throw new Error('Title required when not using children components')
  }

  /**
   * STYLES
   */
  const keyStyles = [ styles.keyStyles ]
  const titleStyles = [ styles.textStyles ]

  if (containerStyle) {
    keyStyles.push(containerStyle)
  }

  if (titleStyle) {
    titleStyles.push(titleStyle)
  }

  /**
   * ACCESSIBILITY
   */
  const accessibilityTraits = ['button']
  if (disabled) {
    keyStyles.push(styles.buttonDisabled)
    titleStyles.push(styles.textDisabled)
    accessibilityTraits.push('disabled')
  }

  /**
   * CONTENT
   */

  const formattedTitle = () => {
    if (title) {
      return Platform.OS === 'android' ? title.toUpperCase() : title
    }
  }

  const TouchKey = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  if (!children) {
    return (
      <TouchKey
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        disabled={disabled}
        onPress={() => this.props.onKeyPress(keyCode)}
        onLongPress={() => this.props.onKeyLongPress(keyCode)}
      >
        <View style={keyStyles}>
          <Text style={titleStyles} disabled={disabled}>{formattedTitle()}</Text>
        </View>
      </TouchKey>
    )
  }

  return (
    <TouchKey
      accessibilityComponentType="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityTraits={accessibilityTraits}
      disabled={disabled}
      onPress={() => onKeyPress(keyCode)}
      onLongPress={() => onKeyLongPress(keyCode)}
    >
      <View style={keyStyles}>
        {children}
      </View>
    </TouchKey>
  )
}

const styles = StyleSheet.create({
  keyStyles: Platform.select({
    ios: {},
    android: {
      borderRadius: 2,
    },
  }),
  textStyles: Platform.select({
    ios: {
      color: '#007AFF',
      textAlign: 'center',
      padding: 8,
      fontSize: 18,
    },
    android: {
      color: 'white',
      textAlign: 'center',
      padding: 8,
      fontWeight: '500',
    },
  }),
  buttonDisabled: {
    backgroundColor: '#dfdfdf',
  },
  textDisabled: Platform.select({
    ios: {
      color: '#cdcdcd',
    },
    android: {
      color: '#a1a1a1',
    },
  }),
})

Key.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.element,
  ]),
  containerStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  keyCode: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onKeyPress: PropTypes.func,
  onKeyLongPress: PropTypes.func,
}

export default Key