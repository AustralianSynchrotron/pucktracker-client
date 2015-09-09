import React from 'react'
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap'
import AdaptorTypeReceptacle from './AdaptorTypeReceptacle'

export default React.createClass({
  render: function() {
    return (
      <Grid>
        <Row>
          <Col md={6}><ReceptaclesPanel side="left"/></Col>
          <Col md={6}><ReceptaclesPanel side="right"/></Col>
        </Row>
      </Grid>
    )
  },
})

var ReceptaclesPanel = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    var side = this.props.side
    var query = this.context.router.getCurrentQuery()
    var key = query[side] || (side == 'left' ? 'adaptor' : 'dewar')
    return {key}
  },
  handleSelect: function(key) {
    var router = this.context.router
    var newQuery = Object.assign(router.getCurrentQuery(), {[this.props.side]: key})
    router.replaceWith(router.getCurrentPathname(),
                       router.getCurrentParams(),
                       newQuery)
    this.setState({key})
  },
  render: function() {
    return (
      <Tabs justified activeKey={this.state.key} onSelect={this.handleSelect}>
        <Tab eventKey={'adaptor'} title='Adaptor'>
          <AdaptorTypeReceptacle/>
        </Tab>
        <Tab eventKey={'dewar'} title='Dewar'>
          <h1>Dewar</h1>
          <p>Coming soon...</p>
        </Tab>
      </Tabs>
    )
  },
})
