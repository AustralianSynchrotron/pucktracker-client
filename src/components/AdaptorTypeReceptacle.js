import React from 'react/addons'
import { Map } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Row, Col, Input } from 'react-bootstrap'
import { AdaptorSlot } from './AdaptorSlot'

export class AdaptorTypeReceptacle extends React.Component {
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }
  onChange (event) {
    this.props.setSelectedReceptacle(this.props.side, 'adaptor', event.target.value)
  }
  pucksForSelectedReceptacle () {
    if (!this.props.selectedReceptacle) return Map()
    return this.props.pucks.filter(puck =>
      puck.receptacleType === 'adaptor'
      && puck.receptacle === this.props.selectedReceptacle
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
                     value={this.props.selectedReceptacle}
                     onChange={this.onChange.bind(this)}>
                <option></option>
                {this.props.adaptors.toList().map(adaptor => (
                  <option key={adaptor.name} value={adaptor.name}>
                    {adaptor.name}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
        </h1>
        {this.props.selectedReceptacle ? (
          <Row>
            <Col md={6}>
              <AdaptorSlot {...this.props} puck={puck_a} slot="A"
                           ports={this.portsForPuck(puck_a)}
              />
              <AdaptorSlot {...this.props} puck={puck_b} slot="B"
                           ports={this.portsForPuck(puck_b)}
              />
            </Col>
            <Col md={6}>
              <AdaptorSlot {...this.props} puck={puck_c} slot="C"
                           ports={this.portsForPuck(puck_c)}
              />
              <AdaptorSlot {...this.props} puck={puck_d} slot="D"
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

AdaptorTypeReceptacle.propTypes = {
  selectedReceptacle: React.PropTypes.string,
}
