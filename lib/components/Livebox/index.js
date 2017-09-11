import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Livebox extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <View>
        {React.cloneElement(this.props.children, {TvBox: 'livebox'})}
      </View>
    )
  }
}

Livebox.propTypes = {
  children: PropTypes.element.isRequired
}

export default Livebox