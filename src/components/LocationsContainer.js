import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Location from './Location'

export default class LocationsContainer extends React.Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col md={4}><Location location="LS3000"/></Col>
          <Col md={4}>
            <Location location="MX1"/>
            <Location location="MX2"/>
          </Col>
          <Col md={4}><Location location="Other"/></Col>
        </Row>
      </Grid>
    )
  }
}
