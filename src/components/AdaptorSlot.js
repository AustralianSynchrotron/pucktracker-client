import React, { Component, PropTypes } from 'react/addons'
import { Map, List } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { ButtonInput, ButtonGroup, Button, Input } from 'react-bootstrap'
import { PuckSelector } from './PuckSelector'
import { TargetPosition } from './TargetPosition'
import { Slot } from './Slot'
import { Puck } from '../reducers/pucks'


export class AdaptorSlot extends Component {
  constructor(props) {
    super(props)
    this.receivePuck = this.receivePuck.bind(this)
    this.togglePortState = this.togglePortState.bind(this)
  }
  receivePuck () {
    if (this.props.puck) { return }
    this.props.setPuckReceptacle(
      this.props.selectedPuck,
      'adaptor',
      this.props.selectedReceptacle,
      this.props.slot
    )
    this.props.setSelectedPuck(null)
  }
  removePuck (puckName) {
    this.props.setPuckReceptacle(puckName, null, null)
  }
  togglePortState (port) {
    this.props.setPortState(port.container, port.number, nextState(port.state))
  }
  render () {
    return (
      <div>
        <div style={{paddingBottom: '6px'}}>
          {this.props.puck ? (
            <PuckSelector {...this.props}
              onDelete={() => this.removePuck(this.props.puck.name)}/>
          ) : (
            <div>
              <TargetPosition isDisabled={!this.props.selectedPuck}
                              onClick={this.receivePuck}>
                Empty
              </TargetPosition>
              <Input type="text" standalone style={{marginTop: '6px'}} disabled />
            </div>
          )}
        </div>
        <PortToggleButtons {...this.props} disabled={!this.props.puck}/>
        <Slot
          name={this.props.slot}
          puck={this.props.puck}
          ports={this.props.ports}
          onSlotClick={this.receivePuck}
          onPortClick={this.togglePortState}
        />
      </div>
    )
  }
}
AdaptorSlot.propTypes = {
  selectedPuck: PropTypes.string,
  puck: PropTypes.instanceOf(Puck),
  ports: ImmutablePropTypes.map,
}

class PortToggleButtons extends Component {
  togglePorts (first, last) {
    const numbers = Array.apply(0, Array(last - first + 1)).map((o, i) => i + first)
    const firstPortKey = List.of(this.props.puck.name, first)
    const newState = nextState(this.props.ports.getIn([firstPortKey, 'state']))
    this.props.setMultiplePortStates(this.props.puck.name, numbers, newState)
  }
  render () {
    return (
      <ButtonGroup justified>
        <ButtonGroup bsSize="xsmall">
          <Button disabled={this.props.disabled}
                  onClick={() => this.togglePorts(1, 5)}>
            Toggle Inner
          </Button>
        </ButtonGroup>
        <ButtonGroup bsSize="xsmall">
          <Button disabled={this.props.disabled}
                  onClick={() => this.togglePorts(6, 16)}>
            Toggle Outer
          </Button>
        </ButtonGroup>
        <ButtonGroup bsSize="xsmall">
          <Button disabled={this.props.disabled}
                  onClick={() => this.togglePorts(1, 16)}>
            Toggle All
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    )
  }
}
PortToggleButtons.propTypes = {
  puck: PropTypes.instanceOf(Puck),
  ports: ImmutablePropTypes.map,
  disabled: PropTypes.bool,
}

function nextState (currentState) {
  switch (currentState) {
    case 'full': return 'empty'
    case 'empty': return 'unknown'
    default: return 'full'
  }
}
