import React, { Component } from 'react/addons'
import { List } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Row, Col, Input, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { TargetPosition } from './TargetPosition'
import { PuckSelector } from './PuckSelector'
import TypeaheadInput from './TypeaheadInput'

export class DewarTypeReceptacle extends Component {
  constructor (props, context) {
    super(props, context)
    const receptacleKey = this.props.side + 'Dewar'
    const {[receptacleKey]: selectedReceptacle=null} = this.props.location.query
    this.state = {
      addPuckInputValue: '',
      selectedReceptacle
    }
  }
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }
  onChange (event) {
    const { history, location } = this.props
    const selectedReceptacle = event.target.value
    const newQuery = Object.assign(
      location.query,
      {[this.props.side + 'Dewar']: selectedReceptacle}
    )
    this.props.history.pushState(null, location.pathname, newQuery)
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
                  <option key={dewar.name} value={dewar.name}>
                    {dewar.name} – EPN: {dewar.epn}
                  </option>
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
