import React, { Component, PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Port } from './Port'
import { Puck } from '../reducers/pucks'

export class Slot extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  static propTypes = {
    name: PropTypes.string,
    puck: PropTypes.instanceOf(Puck),
    ports: ImmutablePropTypes.map,
    onSlotClick: PropTypes.func,
    onPortClick: PropTypes.func,
  };
  renderPorts () {
    return this.props.ports.toList().map(port => (
      <Port key={port.number} port={port} slotName={this.props.name}
        onPortClick={this.props.onPortClick} />
    ))
  }
  renderName () {
    return <span className='puck-name'>{this.props.name}</span>
  }
  render () {
    return (
      <div className="puck" onClick={this.props.onSlotClick}>
        {this.props.puck ? this.renderPorts() : this.renderName()}
      </div>
    )
  }
}
