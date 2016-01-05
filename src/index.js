import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import ReactDOM from 'react-dom'
import Router, { Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import io from 'socket.io-client'
import 'bootstrap/less/bootstrap.less'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import rootReducer from './reducers'
import { ConnectedAdaptorLocations } from './components/AdaptorLocations'
import { ConnectedPuckTransfer } from './components/PuckTransfer'
import { ConnectedDewars } from './components/Dewars'
import { ConnectedPucks } from './components/Pucks'
import { ConnectedBeamline } from './components/Beamline'
import { setConnected } from './actions/app'
import './styles/pucks.less'


const socket = io(`${location.protocol}//${location.hostname}:5901`)

const remoteActionMiddleware = socket => store => next => action => {
  if (action.broadcast) {
    socket.emit('action', action)
  }
  return next(action)
}

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore)

const store = createStoreWithMiddleware(rootReducer)

socket.on('connect', () => {
  store.dispatch(setConnected(true))
})

socket.on('disconnect', () => {
  store.dispatch(setConnected(false))
})

socket.on('action', action => {
  store.dispatch(action)
})

class App extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  render () {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>Puck Tracker</Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/adaptor-locations">
                <NavItem>Adaptor Locations</NavItem>
              </LinkContainer>
              <LinkContainer to="/puck-transfer">
                <NavItem>Puck Transfer</NavItem>
              </LinkContainer>
              <LinkContainer to="/dewars">
                <NavItem>Dewars</NavItem>
              </LinkContainer>
              <LinkContainer to="/pucks">
                <NavItem>Pucks</NavItem>
              </LinkContainer>
              <LinkContainer to="/mx1">
                <NavItem>MX1</NavItem>
              </LinkContainer>
              <LinkContainer to="/mx2">
                <NavItem>MX2</NavItem>
              </LinkContainer>
              <LinkContainer to="/ls3000">
                <NavItem>LS3000</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

function redirectToChild(location, replaceWith) {
  replaceWith(null, '/adaptor-locations')
}

ReactDOM.render(
  <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute onEnter={redirectToChild}/>
          <Route path="adaptor-locations" component={ConnectedAdaptorLocations}/>
          <Route path="puck-transfer" component={ConnectedPuckTransfer}/>
          <Route path="dewars" component={ConnectedDewars}/>
          <Route path="pucks" component={ConnectedPucks}/>
          <Route path="mx1" component={ConnectedBeamline}/>
          <Route path="mx2" component={ConnectedBeamline}/>
          <Route path="ls3000" component={ConnectedBeamline}/>
        </Route>
      </Router>
  </Provider>,
  document.getElementById('app')
)
