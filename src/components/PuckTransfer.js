import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { connect } from 'react-redux'
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { AdaptorTypeReceptacle } from './AdaptorTypeReceptacle'
import { DewarTypeReceptacle } from './DewarTypeReceptacle'
import { setSelectedPuck } from '../actions/app'
import { setPuckReceptacle, updatePuck,
         clearPucksForReceptacle } from '../actions/pucks'
import { setPortState, setMultiplePortStates } from '../actions/ports'
import Disconnected from './Disconnected'

export class PuckTransfer extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  render () {
    if (!this.props.connected) return (<Disconnected />)
    return (
      <Grid>
        <Row>
          <Col md={6}>
            <ReceptaclesPanel side="left" {...this.props} />
          </Col>
          <Col md={6}>
            <ReceptaclesPanel side="right" {...this.props} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

class ReceptaclesPanel extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  constructor (props, context) {
    super(props, context)
    const { query } = this.props.location
    const key = query[props.side] || (props.side == 'left' ? 'adaptor' : 'dewar')
    this.state = { key }
  }
  handleSelect (key) {
    let { pathname, query } = this.props.location
    query[this.props.side] = key
    this.context.router.push({pathname, query})
    this.setState({key})
  }
  render () {
    return (
      <Tabs justified activeKey={this.state.key}
            onSelect={this.handleSelect.bind(this)}>
        <Tab eventKey={'adaptor'} title='Adaptor'>
          <AdaptorTypeReceptacle {...this.props} />
        </Tab>
        <Tab eventKey={'dewar'} title='Dewar'>
          <DewarTypeReceptacle {...this.props} />
        </Tab>
      </Tabs>
    )
  }
}
ReceptaclesPanel.contextTypes = {
  router: React.PropTypes.object,
}

function mapStateToProps(state) {
  return {
    connected: state.app.get('connected'),
    selectedPuck: state.app.get('selectedPuck'),
    adaptors: state.adaptors,
    dewars: state.dewars,
    pucks: state.pucks,
    ports: state.ports,
  }
}

export const ConnectedPuckTransfer = connect(
  mapStateToProps,
  {
    setSelectedPuck,
    setPuckReceptacle,
    updatePuck,
    setPortState,
    setMultiplePortStates,
    clearPucksForReceptacle,
  }
)(PuckTransfer)
