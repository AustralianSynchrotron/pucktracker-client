import React from 'react'
import Router, { Route, Redirect, RouteHandler} from 'react-router'
import 'bootstrap/less/bootstrap.less'
import { Navbar, Nav, CollapsibleNav } from 'react-bootstrap'
import { NavItemLink } from 'react-router-bootstrap'
import LocationsContainer from './components/LocationsContainer'
import ReceptaclesContainer from './components/ReceptaclesContainer'

class App extends React.Component {
  render () {
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
}

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="adaptors" handler={LocationsContainer}/>
    <Route name="pucks" handler={ReceptaclesContainer}/>
    <Redirect from="" to="adaptors" />
  </Route>
)

Router.run(routes, (Handler) => { React.render(<Handler/>, document.body) })
