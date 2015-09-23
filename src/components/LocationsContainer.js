import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { setSelectedHolder } from '../actions'
import Location from './Location'

export class Locations extends React.Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col md={4}>
            <Location holderLocation="LS3000" {...this.props}/>
          </Col>
          <Col md={4}>
            <Location holderLocation="MX1" {...this.props}/>
            <Location holderLocation="MX2" {...this.props}/>
          </Col>
          <Col md={4}>
            <Location holderLocation="Other" {...this.props}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedHolder: state.get('selectedHolder'),
  }
}

export const LocationsContainer = connect(
  mapStateToProps,
  { setSelectedHolder }
)(Locations)
