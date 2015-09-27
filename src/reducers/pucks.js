import {List, fromJS} from 'immutable'

export default function reducer(state=List(), action) {
  switch (action.type) {
    case 'SET_PUCKS': {
      return fromJS(action.pucks)
    }
  }
  return state
}

