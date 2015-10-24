import React, {
  PropTypes,
  Component
} from 'react'

export default class Button extends Component {

  static propTypes = {
    text: PropTypes.string
  }

  constructor(props, context) {
    super(props, context)
  }

  handleClick() {
    return true
  }

  render() {
    return (
      <button className='sonic-button'>{this.props.text}</button>
    )
  }
}
