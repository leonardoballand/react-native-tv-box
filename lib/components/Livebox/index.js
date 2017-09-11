import React from 'react'
import PropTypes from 'prop-types'

const Livebox = props => React.cloneElement(props.children, {TvBox: 'livebox'})

Livebox.propTypes = {
  children: PropTypes.element.isRequired
}

export default Livebox