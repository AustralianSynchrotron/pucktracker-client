import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { browserHistory } from 'react-router'
import { List } from 'immutable'
import { Row, Col, Input, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { TargetPosition } from './TargetPosition'
import { PuckSelector } from './PuckSelector'
import TypeaheadInput from './TypeaheadInput'

export class DewarTypeReceptacle extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  constructor (props) {
    super(props)
    const receptacleKey = this.props.side + 'Dewar'
    const {[receptacleKey]: selectedReceptacle=null} = this.props.location.query
    this.state = {
      addPuckInputValue: '',
      selectedReceptacle
    }
  }
  onChange (event) {
    const selectedReceptacle = event.target.value
    let { pathname, query } = this.props.location
    query[this.props.side + 'Dewar'] = selectedReceptacle
    browserHistory.push({pathname, query})
    this.setState({selectedReceptacle})
  }
  pucksForSelectedReceptacle () {
    if (!this.state.selectedReceptacle) return List()
    return this.props.pucks.filter(puck =>
      puck.receptacleType === 'dewar'
      && puck.receptacle === this.state.selectedReceptacle
    )
  }
  portsForPuck (puck) {
    if (!puck) { return List() }
    return this.props.ports.filter(port =>
      port.containerType === 'puck' && port.container === puck.name
    )
  }
  onAddPuckInputChange (value) {
    this.setState({addPuckInputValue: value})
  }
  addPuck () {
    this.props.setPuckReceptacle(
      this.state.addPuckInputValue,
      'dewar',
      this.state.selectedReceptacle
    )
    this.setState({addPuckInputValue: ''})
  }
  removePuck (puckName) {
    this.props.setPuckReceptacle(puckName, null, null)
  }
  receivePuck () {
    this.props.setPuckReceptacle(
      this.props.selectedPuck,
      'dewar',
      this.state.selectedReceptacle
    )
    this.props.setSelectedPuck(null)
  }
  render () {
    const pucks = this.pucksForSelectedReceptacle()
    const dewars = this.props.dewars.filter(dewar => dewar.onsite)
    return (
      <div>
        <h1>
          <Row>
            <Col md={6}>Dewar:</Col>
            <Col md={6} className="form-group form-group-lg">
              <Input type="select"
                     value={this.state.selectedReceptacle}
                     onChange={this.onChange.bind(this)}>
                <option></option>
                {dewars.toList().map(dewar => (
                  <option key={dewar.name} value={dewar.name}>{dewar.name}</option>
                ))}
              </Input>
            </Col>
          </Row>
        </h1>
        {this.state.selectedReceptacle ? (
          <ListGroup>
            <ListGroupItem>
              <TypeaheadInput
                value={this.state.addPuckInputValue}
                placeholder="Puck name"
                options={this.props.pucks.map(puck => puck.name)}
                onChange={this.onAddPuckInputChange.bind(this)}
                onSubmit={this.addPuck.bind(this)}
                buttonAfter={
                  <Button onClick={this.addPuck.bind(this)}>Add puck</Button>
                }
              />
            </ListGroupItem>
            <ListGroupItem>
              <TargetPosition isDisabled={!this.props.selectedPuck}
                              onClick={this.receivePuck.bind(this)}>
                Move puck here
              </TargetPosition>
            </ListGroupItem>
            {pucks.toList().map(puck =>
             <ListGroupItem key={puck.name}>
               <PuckSelector {...this.props} puck={puck}
                 onDelete={() => this.removePuck(puck.name)}/>
             </ListGroupItem>
            )}
          </ListGroup>
        ) :  (
          null
        )}
    </div>
    )
  }
}
