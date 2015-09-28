import {List, fromJS} from 'immutable'

export default function reducer(state=List(), action) {
  switch (action.type) {
    case 'SET_PUCKS': {
      return fromJS(action.pucks)
    }
    case 'SET_PUCK_RECEPTACLE': {
      const index = state.findIndex(puck => puck.get('name') === action.puck)
      if (index > -1) {
        return state.update(index, puck => puck.merge({
          receptacle: action.receptacle,
          receptacleType: action.receptacleType,
          slot: action.slot,
        }))
      } else {
        return state
      }
    }
  }
  return state
}
