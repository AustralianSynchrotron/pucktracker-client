import React from 'react'
import { Map } from 'immutable'
import shouldPureComponentUpdate from 'react-pure-render/function'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Row, Col, Input } from 'react-bootstrap'
import { AdaptorSlot } from './AdaptorSlot'

export class AdaptorTypeReceptacle extends React.Component {
  constructor (props, context) {
    super(props, context)
    const receptacleKey = this.props.side + 'Adaptor'
    const {[receptacleKey]: selectedReceptacle=null} = this.props.location.query
    this.state = { selectedReceptacle }
  }
  shouldComponentUpdate = shouldPureComponentUpdate
  onChange (event) {
    const { history, location } = this.props
    const selectedReceptacle = event.target.value
    let newQuery = location.query
    newQuery[this.props.side + 'Adaptor'] = selectedReceptacle
    this.props.history.pushState(null, location.pathname, newQuery)
    this.setState({selectedReceptacle})
  }
  pucksForSelectedReceptacle () {
    if (!this.state.selectedReceptacle) return Map()
    return this.props.pucks.filter(puck =>
      puck.receptacleType === 'adaptor'
      && puck.receptacle === this.state.selectedReceptacle
    )
  }
  portsForPuck (puck) {
    if (!puck) { return Map() }
    return this.props.ports.filter(port =>
      port.containerType === 'puck' && port.container === puck.name
    )
  }
  render () {
    const pucks = this.pucksForSelectedReceptacle()
    const puck_a = pucks.find(puck => puck.slot === 'A')
    const puck_b = pucks.find(puck => puck.slot === 'B')
    const puck_c = pucks.find(puck => puck.slot === 'C')
    const puck_d = pucks.find(puck => puck.slot === 'D')
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
          <Row>
            <Col md={6}>
              <AdaptorSlot {...this.props} puck={puck_a} slot="A"
                           selectedReceptacle={this.state.selectedReceptacle}
                           ports={this.portsForPuck(puck_a)}
              />
              <AdaptorSlot {...this.props} puck={puck_b} slot="B"
                           selectedReceptacle={this.state.selectedReceptacle}
                           ports={this.portsForPuck(puck_b)}
              />
            </Col>
            <Col md={6}>
              <AdaptorSlot {...this.props} puck={puck_c} slot="C"
                           selectedReceptacle={this.state.selectedReceptacle}
                           ports={this.portsForPuck(puck_c)}
              />
              <AdaptorSlot {...this.props} puck={puck_d} slot="D"
                           selectedReceptacle={this.state.selectedReceptacle}
                           ports={this.portsForPuck(puck_d)}
              />
            </Col>
          </Row>
        ) : (
          null
        )}
    </div>
    )
  }
}
