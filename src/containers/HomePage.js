import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class HomePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>HomePage!</div>
    )
  }
}

const mapState = (state) => ({})

export default connect(mapState)(HomePage)
