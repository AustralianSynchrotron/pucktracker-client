import React from 'react'
import Router from 'react-router'
import LocationsContainer from './LocationsContainer'
import ReceptaclesContainer from './ReceptaclesContainer'

var Route = Router.Route
var DefaultRoute = Router.DefaultRoute
var Redirect = Router.Redirect
var RouteHandler = Router.RouteHandler
var Link = Router.Link

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="locations">Locations!</Link></li>
          <li><Link to="pucks">Pucks!</Link></li>
        </ul>
        <RouteHandler/>
      </div>
    )
  }
})

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="locations" handler={LocationsContainer}/>
    <Route name="pucks" handler={ReceptaclesContainer}/>
    <Redirect from="" to="locations" />
  </Route>
)

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body)
})
