import {List, fromJS} from 'immutable'

export default function reducer(state=List(), action) {
  switch (action.type) {
    case 'SET_PORTS': {
      return fromJS(action.ports)
    }
    case 'SET_PORT_STATE': {
      const index = state.findIndex(port =>
        port.get('container') === action.container
        && port.get('number') === action.number
      )
      if (index > -1) {
        return state.update(index, port => port.set('state', action.state))
      } else {
        return state
      }
    }
  }
  return state
}
