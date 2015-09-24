import React from 'react'
import { Row, Col, Input } from 'react-bootstrap'

export default class AdaptorTypeReceptacle extends React.Component {
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
              <Input
                type="select"
                value={this.props.selectedReceptacles.get('adaptor')}
                onChange={this.onChange.bind(this)}
              >
                <option></option>
                {this.props.adaptors.keySeq().map(adaptor => (
                  <option key={adaptor} value={adaptor}>
                    {adaptor}
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
