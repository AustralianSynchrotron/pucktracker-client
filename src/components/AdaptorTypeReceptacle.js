import React, { Component, PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Row, Col, Input } from 'react-bootstrap'
import { Adaptor } from './Adaptor'

export class AdaptorTypeReceptacle extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  constructor (props, context) {
    super(props, context)
    const receptacleKey = this.props.side + 'Adaptor'
    const {[receptacleKey]: selectedReceptacle=null} = this.props.location.query
    this.state = { selectedReceptacle }
  }
  onChange (event) {
    const { history, location } = this.props
    const selectedReceptacle = event.target.value
    let { pathname, query } = location
    query[this.props.side + 'Adaptor'] = selectedReceptacle
    this.context.router.push({pathname, query})
    this.setState({selectedReceptacle})
  }
  pucksForSelectedReceptacle () {
    return this.props.pucks.filter(puck =>
      puck.receptacleType === 'adaptor'
      && puck.receptacle === this.state.selectedReceptacle
    )
  }
  render () {
    return (
      <div>
        <h1>
          <Row>
            <Col md={6}>Adaptor:</Col>
            <Col md={6} className="form-group form-group-lg">
              <Input type="select"
                     value={this.state.selectedReceptacle}
                     onChange={this.onChange.bind(this)}>
                <option></option>
                {this.props.adaptors.toList().map(adaptor => (
                  <option key={adaptor.name} value={adaptor.name}>
                    {adaptor.name}
                    {adaptor.location ?
                      ` – ${adaptor.location} / ${adaptor.position}`
                      : ''
                    }
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
        </h1>
        {this.state.selectedReceptacle ? (
          <Adaptor
            selectedReceptacle={this.state.selectedReceptacle}
            selectedPuck={this.props.selectedPuck}
            pucks={this.pucksForSelectedReceptacle()}
            ports={this.props.ports}
            setSelectedPuck={this.props.setSelectedPuck}
            setPuckReceptacle={this.props.setPuckReceptacle}
            updatePuck={this.props.updatePuck}
            setPortState={this.props.setPortState}
            setMultiplePortStates={this.props.setMultiplePortStates}
            clearPucksForReceptacle={this.props.clearPucksForReceptacle}
          />
        ) : (
          null
        )}
      </div>
    )
  }
}
AdaptorTypeReceptacle.contextTypes = {
  router: React.PropTypes.object
}
