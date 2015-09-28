import React from 'react/addons'
import {List} from 'immutable'
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
    if (!this.props.selectedReceptacle) return List()
    return this.props.pucks.filter(puck =>
      puck.get('receptacleType') === 'adaptor'
      && puck.get('receptacle') === this.props.selectedReceptacle
    )
  }
  portsForPuck (puck) {
    if (!puck) { return List() }
    return this.props.ports.filter(port =>
      port.get('containerType') === 'puck'
      && port.get('container') === puck.get('name')
    )
  }
  render () {
    const pucks = this.pucksForSelectedReceptacle()
    const puck_a = pucks.find(puck => puck.get('slot') === 'A')
    const puck_b = pucks.find(puck => puck.get('slot') === 'B')
    const puck_c = pucks.find(puck => puck.get('slot') === 'C')
    const puck_d = pucks.find(puck => puck.get('slot') === 'D')
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
                {this.props.adaptors.map(adaptor => (
                  <option key={adaptor.get('name')} value={adaptor.get('name')}>
                    {adaptor.get('name')}
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
