import React from 'react'
import Router, { Route, IndexRoute } from 'react-router'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import io from 'socket.io-client'
import 'bootstrap/less/bootstrap.less'
import { Navbar, Nav, NavItem, CollapsibleNav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import rootReducer from './reducers'
import { ConnectedAdaptorLocations } from './components/AdaptorLocations'
import { ConnectedPuckTransfer } from './components/PuckTransfer'
import { ConnectedDewars } from './components/Dewars'
import { ConnectedPucks } from './components/Pucks'
import { setAdaptors } from './actions/adaptors'
import './styles/pucks.less'


const socket = io(`${location.protocol}//${location.hostname}:8090`)

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

socket.on('action', action => {
  store.dispatch(action)
})

class App extends React.Component {
  render () {
    return (
      <div>
        <Navbar brand="Puck Tracker" toggleNavKey={0}>
          <CollapsibleNav eventKey={0}>
            <Nav navbar>
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
  replaceWith(null, '/adaptor-locations')
}

React.render(
  (
    <Provider store={store}>
      {() =>
        <Router>
          <Route path="/" component={App}>
            <IndexRoute onEnter={redirectToChild}/>
            <Route path="adaptor-locations" component={ConnectedAdaptorLocations}/>
            <Route path="puck-transfer" component={ConnectedPuckTransfer}/>
            <Route path="dewars" component={ConnectedDewars}/>
            <Route path="pucks" component={ConnectedPucks}/>
          </Route>
        </Router>
      }
    </Provider>
  ),
  document.body
)
