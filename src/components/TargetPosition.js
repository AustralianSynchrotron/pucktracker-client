import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { ButtonInput } from 'react-bootstrap'

export class TargetPosition extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  render () {
    return (
      <ButtonInput block disabled={this.props.isDisabled} standalone
                   onClick={this.props.onClick}>
        {this.props.children}
      </ButtonInput>
    )
  }
}
