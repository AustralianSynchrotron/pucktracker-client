import React from 'react'
import { Row, Col, Input } from 'react-bootstrap'

export default class AdaptorTypeReceptacle extends React.Component {
  render () {
    return (
      <div>
        <h1>
          <Row>
            <Col md={6}>Adaptor:</Col>
            <Col md={6} className="form-group form-group-lg">
              <Input type="select"/>
            </Col>
          </Row>
        </h1>
      </div>
    )
  }
}
