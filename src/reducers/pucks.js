import { OrderedMap, Record } from 'immutable'

export const Puck = Record({
  name: null,
  receptacle: null,
  receptacleType: null,
  slot: null,
  lastDewar: null,
  note: '',
  owner: '',
  institute: '',
  email: '',
})

export default function reducer(state=OrderedMap(), action) {
  switch (action.type) {
    case 'SET_PUCKS': {
      return OrderedMap().withMutations(state => {
        action.pucks.forEach(puck => {
          state.set(puck.name, new Puck(puck))
        })
      })
    }
    case 'ADD_PUCK': {
      return state.set(action.puck.name, new Puck(action.puck))
    }
    case 'DELETE_PUCK': {
      return state.delete(action.puck)
    }
    case 'SET_PUCK_RECEPTACLE': {
      if (!state.has(action.puck)) { return state }
      var state = state.mergeIn([action.puck], {
        receptacle: action.receptacle,
        receptacleType: action.receptacleType,
        slot: action.slot,
      })
      if (action.receptacleType === 'dewar') {
        state = state.setIn([action.puck, 'lastDewar'], action.receptacle)
      }
      return state
    }
    case 'UPDATE_PUCK': {
      return state.mergeIn([action.puck], action.update)
    }
    case 'SET_DEWAR_OFFSITE':
    case 'DELETE_DEWAR': {
      return state.map(puck => {
        if (puck.receptacle === action.dewar) {
          return puck.merge({receptacle: null, receptacleType: null})
        } else {
          return puck
        }
      })
    }
    case 'CLEAR_PUCKS_FOR_RECEPTACLE': {
      return state.map(puck => {
        if (puck.receptacle === action.receptacle
            && puck.receptacleType === action.receptacleType) {
          return puck.merge({receptacle: null, receptacleType: null})
        } else {
          return puck
        }
      })
    }
  }
  return state
}
