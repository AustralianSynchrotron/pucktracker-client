import React from 'react'
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap'
import AdaptorTypeReceptacle from './AdaptorTypeReceptacle'

export default class ReceptaclesContainer extends React.Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col md={6}><ReceptaclesPanel side="left"/></Col>
          <Col md={6}><ReceptaclesPanel side="right"/></Col>
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
          <AdaptorTypeReceptacle/>
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
