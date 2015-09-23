import React from 'react'
import { ButtonInput } from 'react-bootstrap'

export class TargetPosition extends React.Component {
  render () {
    return (
      <ButtonInput block disabled={this.props.isDisabled} standalone
                   onClick={this.props.onClick}>
        {this.props.children}
      </ButtonInput>
    )
  }
}
