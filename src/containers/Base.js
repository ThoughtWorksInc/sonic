import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loading } from '../actions/app'

export default class Base extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div style={ styles.container }>
        { this.props.children }
      </div>
    )
  }
}

const styles = {
  container: {
    height: '100%'
  }
}

const AppAction = { loading }
const mapState = state => ({})
const mapAction = dispatch => ({
  actions: bindActionCreators(AppAction, dispatch)
})

export default connect(mapState, mapAction)(Base)
