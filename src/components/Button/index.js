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

  render() {
    return (
      <span className='sonic-button'>{props.text}</span>
    )
  }
}
