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
        {React.cloneElement(this.props.children, {TvBox: 'freebox'})}
      </View>
    )
  }
}

Freebox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired
}

export default Freebox
