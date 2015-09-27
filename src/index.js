import React from 'react'
import Router, { Route, IndexRoute } from 'react-router'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import io from 'socket.io-client'
import 'bootstrap/less/bootstrap.less'
import { Navbar, Nav, NavItem, CollapsibleNav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import rootReducer from './reducers'
import { LocationsContainer } from './components/LocationsContainer'
import { ConnectedPuckTransfer } from './components/PuckTransfer'
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

React.render(
  (
    <Provider store={store}>
      {() =>
        <Router>
          <Route path="/" component={App}>
            <IndexRoute onEnter={redirectToChild}/>
            <Route path="adaptors" component={LocationsContainer}/>
            <Route path="pucks" component={ConnectedPuckTransfer}/>
          </Route>
        </Router>
      }
    </Provider>
  ),
  document.body
)
