import React from 'react'
import { Grid, Col, Tabs, Tab } from 'react-bootstrap'

export default React.createClass({
  render: function() {
    return (
      <Grid>
        <Col md={6}><ReceptaclesPanel side="left"/></Col>
        <Col md={6}><ReceptaclesPanel side="right"/></Col>
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
    var query = this.context.router.getCurrentQuery()
    query[this.props.side] = key
    this.context.router.replaceWith(
      this.context.router.getCurrentPathname(),
      this.context.router.getCurrentParams(),
      query
    )
    this.setState({key})
  },
  render: function() {
    return (
      <Tabs justified activeKey={this.state.key} onSelect={this.handleSelect}>
        <Tab eventKey={'adaptor'} title='Adaptor'>
          <h1>Adaptor</h1>
        </Tab>
        <Tab eventKey={'dewar'} title='Dewar'>
          <h1>Dewar</h1>
        </Tab>
      </Tabs>
    )
  },
})
