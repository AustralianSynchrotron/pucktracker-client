import React, { Component } from 'react'
import { Map, List } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { ButtonInput, ButtonGroup, Button } from 'react-bootstrap'
import { TargetPosition } from './TargetPosition'


class PortToggleButtons extends Component {
  render () {
    return (
      <ButtonGroup justified>
        <ButtonGroup bsSize="xsmall">
          <Button disabled={this.props.disabled}>Toggle 1-8</Button>
        </ButtonGroup>
        <ButtonGroup bsSize="xsmall">
          <Button disabled={this.props.disabled}>Toggle 9-16</Button>
        </ButtonGroup>
        <ButtonGroup bsSize="xsmall">
          <Button disabled={this.props.disabled}>Toggle All</Button>
        </ButtonGroup>
      </ButtonGroup>
    )
  }
}


class PuckSelector extends Component {
  render () {
    const checkbox = <input type="checkbox" />
    return (
      <ButtonInput className="form-control" standalone addonBefore={checkbox}>
        {this.props.puck.get('name')}
      </ButtonInput>
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


class Port extends Component {
  onClick (event) {
    const {port} = this.props
    this.props.setPortState(
      port.get('container'),
      port.get('number'),
      nextState(port.get('state'))
   )
  }
  render () {
    var classString = classNames('puck-port',
                                 'puck-port-' + this.props.port.get('number'),
                                 'puck-port-' + this.props.port.get('state'))
    return (
      <div className={classString} onClick={this.onClick.bind(this)}>
        {this.props.slot}{this.props.port.get('number')}
      </div>
    )
  }
}


export class AdaptorSlot extends Component {
  render () {
    return (
      <div>
        <div style={{'paddingBottom': '6px'}}>
          {this.props.puck ? (
            <PuckSelector {...this.props}/>
          ) : (
            <TargetPosition>Empty</TargetPosition>
          )}
        </div>
        <PortToggleButtons disabled={!this.props.puck}/>
        <div className="puck">
          {this.props.ports.map(
            port => <Port {...this.props} key={port.get('number')} port={port} />
          )}
        </div>
      </div>
    )
  }
}

AdaptorSlot.propTypes = {
  puck: ImmutablePropTypes.map,
  ports: ImmutablePropTypes.list,
}

AdaptorSlot.defaultProps = {
  ports: List(),
}
