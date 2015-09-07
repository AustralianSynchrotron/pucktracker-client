import React from 'react'
import Router from 'react-router'
import LocationsContainer from './LocationsContainer'
import ReceptaclesContainer from './ReceptaclesContainer'
import 'bootstrap/less/bootstrap.less'
import { Navbar, Nav, NavItem, CollapsibleNav } from 'react-bootstrap'

var Route = Router.Route
var Redirect = Router.Redirect
var RouteHandler = Router.RouteHandler
var Link = Router.Link

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar brand="Puck Tracker" toggleNavKey={0}>
          <CollapsibleNav eventKey={0}>
            <Nav navbar>
              <NavItem href="/#/adaptors">Adaptors</NavItem>
              <NavItem href="/#/pucks">Pucks</NavItem>
            </Nav>
          </CollapsibleNav>
        </Navbar>
        <div className="container">
          <RouteHandler/>
        </div>
      </div>
    )
  }
})

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="adaptors" handler={LocationsContainer}/>
    <Route name="pucks" handler={ReceptaclesContainer}/>
    <Redirect from="" to="adaptors" />
  </Route>
)

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body)
})
