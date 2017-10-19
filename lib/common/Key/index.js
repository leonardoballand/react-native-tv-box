import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  View,
  Text,
  Alert,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native'

import Keymaps from '../../../Keymaps.json'

import styles from './styles'

class Key extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      title,
      keyCode,
      color,
      accessibilityLabel,
      disabled,
      onKeyPress,
      onKeyLongPress,
    } = this.props

    const buttonStyles = [styles.button]
    const textStyles = [styles.text]

    if (color) {
      if (Platform.OS === 'ios') {
        textStyles.push({color: color})
      } else {
        buttonStyles.push({backgroundColor: color})
      }
    }

    const accessibilityTraits = ['button']
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled)
      textStyles.push(styles.textDisabled)
      accessibilityTraits.push('disabled')
    }

    const formattedTitle = Platform.OS === 'android' ? title.toUpperCase() : title
    const TouchKey = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

    return (
      <TouchKey style={styles.button}
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        disabled={disabled}
        onPress={() => this.props.onKeyPress(keyCode)}
        onLongPress={() => this.props.onKeyLongPress(keyCode)}
      >
        <View style={buttonStyles}>
          <Text style={styles.text} disabled={disabled}>{formattedTitle}</Text>
        </View>
      </TouchKey>
    )
  }
}

Key.propTypes = {
  title: PropTypes.string.isRequired,
  keyCode: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.string,
}

export default Key