import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { setSelectedHolder } from '../actions/app'
import { setAdaptorPlace } from '../actions/adaptors'
import Disconnected from './Disconnected'
import Location from './Location'
import { NoLocation } from './NoLocation'

export class AdaptorLocations extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  render () {
    if (!this.props.connected) return (<Disconnected />)
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
            <NoLocation {...this.props}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    connected: state.app.get('connected'),
    selectedHolder: state.app.get('selectedHolder'),
    adaptors: state.adaptors,
    pucks: state.pucks,
  }
}

export const ConnectedAdaptorLocations = connect(
  mapStateToProps,
  { setSelectedHolder, setAdaptorPlace }
)(AdaptorLocations)
