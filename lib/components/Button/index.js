import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

class Button extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>TvBox Button</Text>
        {this.props.children}
      </View>
    )
  }
}

Button.propTypes = {
  children: PropTypes.element
}

export default Button

// const Button = ({children}) => (
//   <View>
//     <Text>Button</Text>
//     {children}
//   </View>
// )

// export default Button