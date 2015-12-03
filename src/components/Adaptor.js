import React, { Component, PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { Map } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Row, Col, Button } from 'react-bootstrap'
import { AdaptorSlot } from './AdaptorSlot'

export class Adaptor extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  static propTypes = {
    pucks: ImmutablePropTypes.map.isRequired,
    ports: ImmutablePropTypes.map.isRequired,
    selectedReceptacle: PropTypes.string,
    selectedPuck: PropTypes.string,
    setSelectedPuck: PropTypes.func.isRequired,
    setPuckReceptacle: PropTypes.func.isRequired,
    updatePuck: PropTypes.func.isRequired,
    setPortState: PropTypes.func.isRequired,
    setMultiplePortStates: PropTypes.func.isRequired,
    clearPucksForReceptacle: PropTypes.func.isRequired,
  }
  portsForPuck (puck) {
    if (!puck) { return Map() }
    return this.props.ports.filter(port =>
      port.containerType === 'puck' && port.container === puck.name
    )
  }
  handleClearAllPucks () {
    this.props.clearPucksForReceptacle(this.props.selectedReceptacle, 'adaptor')
  }
  renderSlot (slot) {
    const puck = this.props.pucks.find(puck => puck.slot === slot)
    const ports = this.portsForPuck(puck)
    return (
      <AdaptorSlot slot={slot} puck={puck} ports={ports}
                   selectedReceptacle={this.props.selectedReceptacle}
                   selectedPuck={this.props.selectedPuck}
                   setSelectedPuck={this.props.setSelectedPuck}
                   setPuckReceptacle={this.props.setPuckReceptacle}
                   updatePuck={this.props.updatePuck}
                   setPortState={this.props.setPortState}
                   setMultiplePortStates={this.props.setMultiplePortStates}
      />
    )
  }
  render () {
    return (
      <div>
        <Row>
          <Col md={6}>
            {this.renderSlot('A')}
            {this.renderSlot('B')}
          </Col>
          <Col md={6}>
            {this.renderSlot('C')}
            {this.renderSlot('D')}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button ref='clearAllPucks' block
              onClick={this.handleClearAllPucks.bind(this)}>
              Clear all pucks
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}
