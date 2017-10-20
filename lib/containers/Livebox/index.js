import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import Keymaps from '../../../Keymaps.json'

class Livebox extends Component {
  constructor(props) {
    super(props)

    this._onPress = this._onPress.bind(this)
    this._onLongPress = this._onLongPress.bind(this)
  }

  componentWillMount() {
    const {ip} = this.props
    if (ip) {
      this.setState({ip})
    } else {
      throw new Error('ERROR: Tv Box IP is required!')
    }
  }

  _onPress(keyCode) {
    if (Keymaps.livebox[keyCode] !== undefined) {
      fetch(`http://${this.state.ip}:8080/remoteControl/cmd?operation=01&key=${Keymaps.livebox[keyCode]}&mode=0`)
        .then(res => res.json())
        .then(({result}) => {
          if (result.responseCode !== '0' || result.message !== 'ok') {
            throw new Error('ERROR: Bad response from server!')
          }
        })
        .catch(e => {
          Alert.alert(
            'An error occurred',
            'Please try again later. If problem persists, reboot your Tv Box.',
            [{text: 'OK', onPress: () => console.log('OK pressed')}]
          )
        })
    } else {
      throw new Error('ERROR: Bad keycode!')
    }
  }

  _onLongPress(keyCode) {
    if (Keymaps.livebox[keyCode] !== undefined) {
      fetch(`http://${this.state.ip}:8080/remoteControl/cmd?operation=01&key=${Keymaps.livebox[keyCode]}&mode=1`)
        .then(res => res.json())
        .then(({result}) => {
          if (result.responseCode !== '0' || result.message !== 'ok') {
            throw new Error('ERROR: Bad response from server!')
          }
        })
        .catch(e => {
          Alert.alert(
            'An error occurred',
            'Please try again later. If problem persists, reboot your Tv Box.',
            [{text: 'OK', onPress: () => console.log('OK pressed')}]
          )
        })
    } else {
      throw new Error('ERROR: Bad keycode!')
    }
  }

  render () {
    return (
      <View>
        {React.cloneElement(this.props.children, {
          onKeyPress: this._onPress,
          onKeyLongPress: this._onLongPress
        })}
      </View>
    )
  }
}

Livebox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(propTypes.element),
    PropTypes.element,
  ]).isRequired,
  ip: PropTypes.string,
}

export default Livebox