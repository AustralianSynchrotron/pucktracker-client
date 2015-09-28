import {List, fromJS} from 'immutable'

export default function reducer(state=List(), action) {
  switch (action.type) {
    case 'SET_PORTS': {
      return fromJS(action.ports)
    }
  }
  return state
}

