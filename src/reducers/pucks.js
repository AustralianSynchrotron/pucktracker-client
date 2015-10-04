import { OrderedMap, Record } from 'immutable'

export const Puck = Record({
  name: null,
  receptacle: null,
  receptacleType: null,
  slot: null,
  note: '',
  owner: '',
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
    case 'SET_PUCK_RECEPTACLE': {
      if (!state.has(action.puck)) { return state }
      return state.mergeIn([action.puck], {
        receptacle: action.receptacle,
        receptacleType: action.receptacleType,
        slot: action.slot,
      })
    }
    case 'UPDATE_PUCK': {
      return state.mergeIn([action.puck], action.update)
    }
    case 'SET_DEWAR_OFFSITE': {
      return state.map(puck => {
        if (puck.receptacle === action.dewar) {
          return puck.merge({receptacle: null, receptacleType: null})
        } else {
          return puck
        }
      })
    }
  }
  return state
}
