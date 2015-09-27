import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { AdaptorTypeReceptacle } from './AdaptorTypeReceptacle'
import { setSelectedReceptacle } from '../actions/app'

export class PuckTransfer extends React.Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col md={6}>
            <ReceptaclesPanel
              side="left" {...this.props}
              selectedReceptacles={this.props.selectedReceptacles.get('left')}
            />
          </Col>
          <Col md={6}>
            <ReceptaclesPanel
              side="right" {...this.props}
              selectedReceptacles={this.props.selectedReceptacles.get('right')}
            />
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
    const { side } = this.props
    const newQuery = Object.assign(location.query, {[side]: key})
    history.pushState(null, location.pathname, newQuery)
    this.setState({ key })
  }

  render () {
    return (
      <Tabs justified activeKey={this.state.key}
            onSelect={this.handleSelect.bind(this)}>
        <Tab eventKey={'adaptor'} title='Adaptor'>
          <AdaptorTypeReceptacle
            {...this.props}
            selectedReceptacle={this.props.selectedReceptacles.get('adaptor')}
          />
        </Tab>
        <Tab eventKey={'dewar'} title='Dewar'>
          <h1>Dewar</h1>
          <p>Coming soon...</p>
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
    selectedReceptacles: state.app.get('selectedReceptacles'),
    adaptors: state.adaptors,
    pucks: state.pucks,
  }
}

export const ConnectedPuckTransfer = connect(
  mapStateToProps,
  {setSelectedReceptacle}
)(PuckTransfer)
