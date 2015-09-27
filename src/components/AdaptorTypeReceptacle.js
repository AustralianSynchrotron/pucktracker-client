import React from 'react/addons'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Row, Col, Input } from 'react-bootstrap'

export class AdaptorTypeReceptacle extends React.Component {
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }
  onChange (event) {
    this.props.setSelectedReceptacle(this.props.side, 'adaptor', event.target.value)
  }
  render () {
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
      </div>
    )
  }
}

AdaptorTypeReceptacle.propTypes = {
  selectedReceptacle: React.PropTypes.string,
}
