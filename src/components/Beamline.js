import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { BeamlineAdaptorTable } from './BeamlineAdaptorTable'


export class Beamline extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  findAdaptor (position, adaptors) {
    return adaptors.find(adaptor => adaptor.position === position)
  }
  findPucks (adaptorName) {
    return this.props.pucks.filter(
      puck => puck.receptacle === adaptorName
    )
  }
  renderPosition (name, adaptors) {
    const adaptor = this.findAdaptor(name, adaptors)
    const pucks = adaptor ? this.findPucks(adaptor.name) : Map()
    return (
      <BeamlineAdaptorTable key={name} name={name} adaptor={adaptor}
                             pucks={pucks} dewars={this.props.dewars} />
    )
  }
  render () {
    const beamline = this.props.location.pathname.replace('/', '').toUpperCase()
    const adaptors = this.props.adaptors.filter(
      adaptor => adaptor.location === beamline
    )
    let positions
    if (beamline === 'MX1' || beamline === 'MX2') {
      positions = ['Left', 'Middle', 'Right'].map(
        name => this.renderPosition(name, adaptors)
      )
    } else {
      positions = 'ABCDEFGHIJKL'.split('').map(
        name => this.renderPosition(name, adaptors)
      )
    }
    return (
      <div>
        <h1>{beamline}</h1>
        {positions}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    adaptors: state.adaptors,
    pucks: state.pucks,
    dewars: state.dewars,
  }
}

export const ConnectedBeamline = connect(
  mapStateToProps,
  {}
)(Beamline)
