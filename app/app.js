import React from 'react'
import Router from 'react-router'
import LocationsContainer from './LocationsContainer'
import ReceptaclesContainer from './ReceptaclesContainer'
import 'bootstrap/less/bootstrap.less'

var Route = Router.Route
var Redirect = Router.Redirect
var RouteHandler = Router.RouteHandler
var Link = Router.Link

var App = React.createClass({
  render: function () {
    return (
      <div>
        <nav className="navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Puck Tracker</a>
              <button type="button" className="navbar-toggle collapsed"
                      data-toggle="collapse" data-target="#navbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><Link to="adaptors">Adaptors</Link></li>
                <li><Link to="pucks">Pucks</Link></li>
              </ul>
            </div>
          </div>
        </nav>
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
