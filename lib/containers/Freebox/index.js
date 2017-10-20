import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

class Freebox extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <View>
        {
          React.Children.map(this.props.children, child => {
            const { props, children } = child
            if (children) {
              return React.cloneElement(
                child,
                {
                  onKeyPress: this._onPress,
                  onKeyLongPress: this._onLongPress,
                  ...children
                },
              )
            } else {
              return React.cloneElement(
                child,
                {
                  ...props,
                  onKeyPress: this._onPress,
                  onKeyLongPress: this._onLongPress
                }
              )
            }
          })
        }
      </View>
    )
  }
}

Freebox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default Freebox
