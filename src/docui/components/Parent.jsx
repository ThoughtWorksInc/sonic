import React, {
  Component,
  PropTypes
} from 'react';

export default class Parent extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor (props) {
    super(props);
  }

  render () {
    return <div className="parent">{this.props.children}</div>
  }
}
