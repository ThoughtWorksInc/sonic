import {
  Component,
  PropTypes
} from 'react'

class If extends Component {
  static propTypes = {
    test: PropTypes.bool.isRequired,
    children: PropTypes.node
  };
  render() {
    if (this.props.test) {
      return this.props.children
    }
    return false
  }
}

export default If
