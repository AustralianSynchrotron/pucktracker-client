import React from 'react'
import Router from 'react-router'
import 'bootstrap/less/bootstrap.less'
import { Navbar, Nav, CollapsibleNav } from 'react-bootstrap'
import { NavItemLink } from 'react-router-bootstrap'
import LocationsContainer from './LocationsContainer'
import ReceptaclesContainer from './ReceptaclesContainer'

var Route = Router.Route
var Redirect = Router.Redirect
var RouteHandler = Router.RouteHandler

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar brand="Puck Tracker" toggleNavKey={0}>
          <CollapsibleNav eventKey={0}>
            <Nav navbar>
              <NavItemLink to="adaptors">Adaptors</NavItemLink>
              <NavItemLink to="pucks">Pucks</NavItemLink>
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
