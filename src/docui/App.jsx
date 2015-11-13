import React, {
  Component,
  PropTypes
} from 'react';

import {Provider, connect} from 'react-redux';
import {Route, Link} from 'react-router';

@connect((state) => ({}))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor (props) {
    super(props);
    this.handleClick = this.handleClick
      .bind(this);
  }

  handleClick (event) {
    event.preventDefault();
    const {dispatch} = this.props;

    dispatch(pushState(null, '/parent/child/custom'));
  }

  render () {
    const links = [
      '/',
      '/parent?foo=bar',
      '/parent/child?bar=baz',
      '/parent/child/123?baz=foo'
    ].map((l, index) => <p>
      <Link key={index} to={l}>{l}</Link>
    </p>);

    return (
      <div id="app">
        <h1>App Container!!</h1>
        {links}
        {this.props.children}
      </div>
    );
  }
}
