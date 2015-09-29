import React from 'react/addons'
import {List} from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Row, Col, Input, Table } from 'react-bootstrap'
import { TargetPosition } from './TargetPosition'
import { PuckSelector } from './PuckSelector'


export class DewarTypeReceptacle extends React.Component {
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }
  onChange (event) {
    this.props.setSelectedReceptacle(this.props.side, 'dewar', event.target.value)
  }
  pucksForSelectedReceptacle () {
    if (!this.props.selectedReceptacle) return List()
    return this.props.pucks.filter(puck =>
      puck.receptacleType === 'dewar'
      && puck.receptacle === this.props.selectedReceptacle
    )
  }
  portsForPuck (puck) {
    if (!puck) { return List() }
    return this.props.ports.filter(port =>
      port.containerType === 'puck' && port.container === puck.name
    )
  }
  receivePuck () {
    this.props.setPuckReceptacle(
      this.props.selectedPuck,
      'dewar',
      this.props.selectedReceptacle,
      null
    )
    this.props.setSelectedPuck(null)
  }
  render () {
    const pucks = this.pucksForSelectedReceptacle()
    return (
      <div>
        <h1>
          <Row>
            <Col md={6}>Dewar:</Col>
            <Col md={6} className="form-group form-group-lg">
              <Input type="select"
                     value={this.props.selectedReceptacle}
                     onChange={this.onChange.bind(this)}>
                <option></option>
                {this.props.dewars.toList().map(dewar => (
                  <option key={dewar.name} value={dewar.name}>
                    {dewar.name}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
        </h1>
        {this.props.selectedReceptacle ? (
          <div>
            <div className="form-group">
              <TargetPosition isDisabled={!this.props.selectedPuck}
                              onClick={this.receivePuck.bind(this)}>
                Move puck here
              </TargetPosition>
            </div>
            <Table striped condensed>
              <tbody>
              {pucks.toList().map(puck =>
                <tr key={puck.name}>
                  <td>
                    <PuckSelector {...this.props} puck={puck} />
                  </td>
                </tr>
              )}
              </tbody>
            </Table>
          </div>
        ) :  (
          null
        )}
    </div>
    )
  }
}

DewarTypeReceptacle.propTypes = {
  selectedReceptacle: React.PropTypes.string,
}
