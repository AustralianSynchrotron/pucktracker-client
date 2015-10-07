import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { AdaptorTypeReceptacle } from './AdaptorTypeReceptacle'
import { DewarTypeReceptacle } from './DewarTypeReceptacle'
import { setSelectedPuck } from '../actions/app'
import { setPuckReceptacle } from '../actions/pucks'
import { setPortState, setMultiplePortStates } from '../actions/ports'

export class PuckTransfer extends React.Component {
  render () {
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

class ReceptaclesPanel extends React.Component {
  constructor (props, context) {
    super(props, context)
    const query = this.context.location.query
    const key = query[props.side] || (props.side == 'left' ? 'adaptor' : 'dewar')
    this.state = { key }
  }
  handleSelect (key) {
    const { history, location } = this.context
    const newQuery = Object.assign(location.query, {[this.props.side]: key})
    history.pushState(null, location.pathname, newQuery)
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
  history: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
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
    setPortState,
    setMultiplePortStates,
  }
)(PuckTransfer)
