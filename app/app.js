import React from 'react'
import Router, { Route, IndexRoute } from 'react-router'
import 'bootstrap/less/bootstrap.less'
import { Navbar, Nav, NavItem, CollapsibleNav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import LocationsContainer from './components/LocationsContainer'
import ReceptaclesContainer from './components/ReceptaclesContainer'

class App extends React.Component {
  render () {
    return (
      <div>
        <Navbar brand="Puck Tracker" toggleNavKey={0}>
          <CollapsibleNav eventKey={0}>
            <Nav navbar>
              <LinkContainer to="/adaptors">
                <NavItem>Adaptors</NavItem>
              </LinkContainer>
              <LinkContainer to="/pucks">
                <NavItem>Pucks</NavItem>
              </LinkContainer>
            </Nav>
          </CollapsibleNav>
        </Navbar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

function redirectToChild(location, replaceWith) {
  replaceWith(null, '/adaptors')
}

React.render((
    <Router>
      <Route path="/" component={App}>
        <IndexRoute onEnter={redirectToChild}/>
        <Route path="adaptors" component={LocationsContainer}/>
        <Route path="pucks" component={ReceptaclesContainer}/>
      </Route>
    </Router>
  ),
  document.body
)
