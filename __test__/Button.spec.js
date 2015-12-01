import test from 'tape'
import TestUtils from 'react-addons-test-utils'
import sd from 'skin-deep'
import React from 'react'
import Button from '../src/components/Button'

const before = test
let buttonVdom, buttonInstance

before('before', (t) => {
  const tree = sd.shallowRender(React.createElement(Button, {text: 'button'}))
  buttonVdom = tree.getRenderOutput()
  buttonInstance = tree.getMountedInstance()
  t.pass('before')
  t.end()
})

test('Button init', (t) => {
  t.equal(TestUtils.isCompositeComponent(buttonInstance), true, 'Button is init')
  t.equal(buttonInstance.props.text, 'button', 'Button text is button')
  t.equal(buttonVdom.type, 'button', 'Button type is button')
  t.equal(buttonVdom.props.className, 'sonic-button', 'Button class is sonic-button')
  t.end()
})

test('Button tigger click', (t) => {
  t.equal(buttonInstance.handleClick(), true, 'Trigger button return true')
  t.end()
})
