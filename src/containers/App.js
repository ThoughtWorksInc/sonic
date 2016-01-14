import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default class App extends Component {
  static propTypes = {
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
  }
}

const mapState = state => ({})

export default connect(mapState)(App)
