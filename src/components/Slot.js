import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Port } from './Port'
import { Puck } from '../reducers/pucks'

export class Slot extends Component {
  renderPorts () {
    return this.props.ports.toList().map(port => (
      <Port key={port.number} port={port} slotName={this.props.name}
        onPortClick={this.props.onPortClick} />
    ))
  }
  render () {
    return (
      <div className="puck" onClick={this.props.onSlotClick}>
        {this.renderPorts()}
      </div>
    )
  }
}

Slot.propTypes = {
  name: PropTypes.string,
  puck: PropTypes.instanceOf(Puck),
  ports: ImmutablePropTypes.map,
  onSlotClick: PropTypes.func,
  onPortClick: PropTypes.func,
}
