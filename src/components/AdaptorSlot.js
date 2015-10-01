import React, { Component, PropTypes } from 'react/addons'
import { Map, List } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { ButtonInput, ButtonGroup, Button } from 'react-bootstrap'
import { PuckSelector } from './PuckSelector'
import { TargetPosition } from './TargetPosition'
import { Puck } from '../reducers/pucks'


export class AdaptorSlot extends Component {
  receivePuck () {
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
  render () {
    return (
      <div>
        <div style={{'paddingBottom': '6px'}}>
          {this.props.puck ? (
            <PuckSelector {...this.props}
              onDelete={() => this.removePuck(this.props.puck.name)}/>
          ) : (
            <TargetPosition isDisabled={!this.props.selectedPuck}
                            onClick={this.receivePuck.bind(this)}>
              Empty
            </TargetPosition>
          )}
        </div>
        <PortToggleButtons {...this.props} disabled={!this.props.puck}/>
        <div className="puck">
          {this.props.ports.toList().map(
            port => <Port {...this.props} key={port.number} port={port} />
          )}
        </div>
      </div>
    )
  }
}

AdaptorSlot.propTypes = {
  selectedPuck: PropTypes.string,
  puck: PropTypes.instanceOf(Puck),
  ports: ImmutablePropTypes.map,
}

AdaptorSlot.defaultProps = {
  ports: Map(),
}

class Port extends Component {
  onClick (event) {
    const {port} = this.props
    this.props.setPortState(
      port.container,
      port.number,
      nextState(port.state)
   )
  }
  render () {
    var classString = classNames('puck-port',
                                 'puck-port-' + this.props.port.number,
                                 'puck-port-' + this.props.port.state)
    return (
      <div className={classString} onClick={this.onClick.bind(this)}>
        {this.props.slot}{this.props.port.number}
      </div>
    )
  }
}

class PortToggleButtons extends Component {
  togglePorts (first, last) {
    const numbers = Array.apply(0, Array(last - first + 1)).map((o, i) => i + first)
    const firstPortKey = List.of(this.props.puck.name, first)
    const newState = nextState(this.props.ports.getIn([firstPortKey, 'state']))
    this.props.setMultiplePortStates(
      this.props.puck.name, numbers, newState
    )
  }
  render () {
    return (
      <ButtonGroup justified>
        <ButtonGroup bsSize="xsmall">
          <Button disabled={this.props.disabled}
                  onClick={() => this.togglePorts(1, 8)}>
            Toggle 1-8
          </Button>
        </ButtonGroup>
        <ButtonGroup bsSize="xsmall">
          <Button disabled={this.props.disabled}
                  onClick={() => this.togglePorts(9, 16)}>
            Toggle 9-16
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

function nextState (currentState) {
  switch (currentState) {
    case 'full':
      return 'empty'
    case 'empty':
      return 'unknown'
    default:
      return 'full'
  }
}
